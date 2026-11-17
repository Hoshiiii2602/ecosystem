import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: string, data: any) {
    const { variants, ...productData } = data;

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Create Product
      const product = await tx.product.create({
        data: {
          ...productData,
          storeId,
        },
      });

      // 2. Create Variants if any
      if (variants && variants.length > 0) {
        await tx.productVariant.createMany({
          data: variants.map((v: any) => ({
            ...v,
            productId: product.id,
          })),
        });
      }

      // 3. Initialize Inventory in all branches of the store
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

  async findAll(storeId: string, query: any) {
    const { page = 1, limit = 10, search, categoryId } = query;
    const skip = (page - 1) * limit;

    const where: any = {
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

  async findOne(storeId: string, id: string) {
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

  async update(storeId: string, id: string, data: any) {
    return this.prisma.product.updateMany({
      where: { id, storeId },
      data,
    });
  }

  async remove(storeId: string, id: string) {
    return this.prisma.product.updateMany({
      where: { id, storeId },
      data: { deletedAt: new Date() },
    });
  }
}
