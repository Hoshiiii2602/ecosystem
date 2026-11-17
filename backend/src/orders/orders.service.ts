import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library.js';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async checkout(storeId: string, userId: string, checkoutDto: any) {
    const {
      branchId,
      customerId,
      items,
      paymentMethod,
      discount = 0,
      tax = 0,
      note,
    } = checkoutDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Calculate totals
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

        // 2. Update Inventory
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

        // 3. Create Inventory Transaction
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

      // 4. Create Order
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

      // 5. Create Payment
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

  async findAll(storeId: string, query: any) {
    const { branchId, customerId, status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      storeId,
    };

    if (branchId) where.branchId = branchId;
    if (customerId) where.customerId = customerId;
    if (status) where.status = status;

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

  async findOne(storeId: string, id: string) {
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
}
