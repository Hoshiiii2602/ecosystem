var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
let StoresService = class StoresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerStore(data) {
        const { storeName, email, password, fullName, phone } = data;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prisma.$transaction(async (tx) => {
            const store = await tx.store.create({
                data: {
                    name: storeName,
                    email,
                    phone,
                },
            });
            await tx.branch.create({
                data: {
                    name: 'Chi nhánh mặc định',
                    storeId: store.id,
                    isMain: true,
                },
            });
            const adminRole = await tx.role.create({
                data: {
                    name: 'ADMIN',
                    storeId: store.id,
                    description: 'Quản trị viên toàn quyền',
                },
            });
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    fullName,
                    phone,
                    storeId: store.id,
                },
            });
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
    async getStoreInfo(storeId) {
        return this.prisma.store.findUnique({
            where: { id: storeId },
            include: {
                branches: true,
            },
        });
    }
};
StoresService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], StoresService);
export { StoresService };
//# sourceMappingURL=stores.service.js.map