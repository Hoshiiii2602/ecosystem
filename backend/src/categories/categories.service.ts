import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: string, data: any) {
    return this.prisma.category.create({
      data: {
        ...data,
        storeId,
      },
    });
  }

  async findAll(storeId: string) {
    return this.prisma.category.findMany({
      where: { storeId },
      include: {
        children: true,
      },
    });
  }

  async findOne(storeId: string, id: string) {
    return this.prisma.category.findFirst({
      where: { id, storeId },
      include: {
        children: true,
        products: true,
      },
    });
  }

  async update(storeId: string, id: string, data: any) {
    return this.prisma.category.updateMany({
      where: { id, storeId },
      data,
    });
  }

  async remove(storeId: string, id: string) {
    return this.prisma.category.deleteMany({
      where: { id, storeId },
    });
  }
}
