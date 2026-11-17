import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async registerStore(data: any) {
    const { storeName, email, password, fullName, phone } = data;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Create Store
      const store = await tx.store.create({
        data: {
          name: storeName,
          email,
          phone,
        },
      });

      // 2. Create default Branch
      await tx.branch.create({
        data: {
          name: 'Chi nhánh mặc định',
          storeId: store.id,
          isMain: true,
        },
      });

      // 3. Create default Admin Role
      const adminRole = await tx.role.create({
        data: {
          name: 'ADMIN',
          storeId: store.id,
          description: 'Quản trị viên toàn quyền',
        },
      });

      // 4. Create Admin User
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
          phone,
          storeId: store.id,
        },
      });

      // 5. Assign Role to User
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId: adminRole.id,
        },
      });

      return {
        storeId: store.id,
        userId: user.id,
        message: 'Store registered successfully',
      };
    });
  }

  async getStoreInfo(storeId: string) {
    return this.prisma.store.findUnique({
      where: { id: storeId },
      include: {
        branches: true,
      },
    });
  }
}
