var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(storeId, data) {
        const { variants, ...productData } = data;
        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    ...productData,
                    storeId,
                },
            });
            if (variants && variants.length > 0) {
                await tx.productVariant.createMany({
                    data: variants.map((v) => ({
                        ...v,
                        productId: product.id,
                    })),
                });
            }
            const branches = await tx.branch.findMany({
                where: { storeId },
            });
            for (const branch of branches) {
                await tx.inventory.create({
                    data: {
                        productId: product.id,
                        branchId: branch.id,
                        quantity: 0,
                    },
                });
            }
            return tx.product.findUnique({
                where: { id: product.id },
                include: {
                    variants: true,
                    inventories: true,
                },
            });
        });
    }
    async findAll(storeId, query) {
        const { page = 1, limit = 10, search, categoryId } = query;
        const skip = (page - 1) * limit;
        const where = {
            storeId,
            deletedAt: null,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { sku: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: Number(limit),
                include: {
                    category: true,
                    variants: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            items,
            total,
            page: Number(page),
            limit: Number(limit),
        };
    }
    async findOne(storeId, id) {
        return this.prisma.product.findFirst({
            where: { id, storeId, deletedAt: null },
            include: {
                category: true,
                variants: true,
                inventories: {
                    include: { branch: true },
                },
            },
        });
    }
    async update(storeId, id, data) {
        return this.prisma.product.updateMany({
            where: { id, storeId },
            data,
        });
    }
    async remove(storeId, id) {
        return this.prisma.product.updateMany({
            where: { id, storeId },
            data: { deletedAt: new Date() },
        });
    }
};
ProductsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map