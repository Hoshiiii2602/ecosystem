import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: string, data: any) {
    return this.prisma.supplier.create({
      data: {
        ...data,
        storeId,
      },
    });
  }

  async findAll(storeId: string, query: any) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      storeId,
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.supplier.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.supplier.count({ where }),
    ]);

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  async findOne(storeId: string, id: string) {
    return this.prisma.supplier.findFirst({
      where: { id, storeId, deletedAt: null },
      include: {
        purchaseOrders: true,
      },
    });
  }

  async update(storeId: string, id: string, data: any) {
    return this.prisma.supplier.updateMany({
      where: { id, storeId },
      data,
    });
  }

  async remove(storeId: string, id: string) {
    return this.prisma.supplier.updateMany({
      where: { id, storeId },
      data: { deletedAt: new Date() },
    });
  }
}
