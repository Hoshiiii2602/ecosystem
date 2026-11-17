import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(storeId: string, data: any) {
    const { email, password, fullName, phone, roleIds } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        storeId,
        roles: {
          create: roleIds.map((roleId: string) => ({
            roleId,
          })),
        },
      },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async findAll(storeId: string) {
    return this.prisma.user.findMany({
      where: { storeId, deletedAt: null },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async findOne(storeId: string, id: string) {
    return this.prisma.user.findFirst({
      where: { id, storeId, deletedAt: null },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async update(storeId: string, id: string, data: any) {
    const { password, roleIds, ...userData } = data;

    if (password) {
      userData.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (roleIds) {
        // Remove old roles
        await tx.userRole.deleteMany({
          where: { userId: id },
        });

        // Add new roles
        await tx.userRole.createMany({
          data: roleIds.map((roleId: string) => ({
            userId: id,
            roleId,
          })),
        });
      }

      return tx.user.update({
        where: { id },
        data: userData,
        include: {
          roles: {
            include: { role: true },
          },
        },
      });
    });
  }

  async remove(storeId: string, id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
