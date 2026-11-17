import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: string, data: any) {
    return this.prisma.customer.create({
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
      this.prisma.customer.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  async findOne(storeId: string, id: string) {
    return this.prisma.customer.findFirst({
      where: { id, storeId, deletedAt: null },
      include: {
        orders: true,
      },
    });
  }

  async update(storeId: string, id: string, data: any) {
    return this.prisma.customer.updateMany({
      where: { id, storeId },
      data,
    });
  }

  async remove(storeId: string, id: string) {
    return this.prisma.customer.updateMany({
      where: { id, storeId },
      data: { deletedAt: new Date() },
    });
  }
}
