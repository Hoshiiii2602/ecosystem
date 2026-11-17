var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Decimal } from '@prisma/client/runtime/library.js';
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkout(storeId, userId, checkoutDto) {
        const { branchId, customerId, items, paymentMethod, discount = 0, tax = 0, note, } = checkoutDto;
        if (!items || items.length === 0) {
            throw new BadRequestException('Order must have at least one item');
        }
        return this.prisma.$transaction(async (tx) => {
            let totalAmount = new Decimal(0);
            const orderItemsData = [];
            for (const item of items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                });
                if (!product) {
                    throw new BadRequestException(`Product ${item.productId} not found`);
                }
                const itemTotal = new Decimal(item.price).mul(item.quantity);
                totalAmount = totalAmount.add(itemTotal);
                orderItemsData.push({
                    productId: item.productId,
                    variantId: item.variantId,
                    quantity: item.quantity,
                    price: item.price,
                    costPrice: product.costPrice,
                    discount: item.discount || 0,
                    total: itemTotal,
                });
                const inventory = await tx.inventory.findUnique({
                    where: {
                        productId_branchId: {
                            productId: item.productId,
                            branchId: branchId,
                        },
                    },
                });
                if (!inventory || inventory.quantity < item.quantity) {
                    throw new BadRequestException(`Insufficient stock for product ${product.name}`);
                }
                const updatedInventory = await tx.inventory.update({
                    where: { id: inventory.id },
                    data: {
                        quantity: {
                            decrement: item.quantity,
                        },
                    },
                });
                await tx.inventoryTransaction.create({
                    data: {
                        inventoryId: updatedInventory.id,
                        type: 'OUT',
                        quantity: item.quantity,
                        note: `Order checkout`,
                    },
                });
            }
            const finalAmount = totalAmount.minus(discount).plus(tax);
            const orderCode = `ORD-${Date.now()}`;
            const order = await tx.order.create({
                data: {
                    code: orderCode,
                    storeId,
                    branchId,
                    customerId,
                    userId,
                    totalAmount,
                    discount,
                    tax,
                    finalAmount,
                    note,
                    status: 'COMPLETED',
                    items: {
                        create: orderItemsData,
                    },
                },
                include: {
                    items: true,
                },
            });
            await tx.payment.create({
                data: {
                    orderId: order.id,
                    amount: finalAmount,
                    method: paymentMethod,
                },
            });
            return order;
        });
    }
    async findAll(storeId, query) {
        const { branchId, customerId, status, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {
            storeId,
        };
        if (branchId)
            where.branchId = branchId;
        if (customerId)
            where.customerId = customerId;
        if (status)
            where.status = status;
        const [items, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    items: {
                        include: { product: true },
                    },
                    customer: true,
                    payments: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.order.count({ where }),
        ]);
        return {
            items,
            total,
            page: Number(page),
            limit: Number(limit),
        };
    }
    async findOne(storeId, id) {
        return this.prisma.order.findFirst({
            where: { id, storeId },
            include: {
                items: {
                    include: { product: true },
                },
                customer: true,
                payments: true,
            },
        });
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map