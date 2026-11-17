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
let EmployeesService = class EmployeesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(storeId, data) {
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
                    create: roleIds.map((roleId) => ({
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
    async findAll(storeId) {
        return this.prisma.user.findMany({
            where: { storeId, deletedAt: null },
            include: {
                roles: {
                    include: { role: true },
                },
            },
        });
    }
    async findOne(storeId, id) {
        return this.prisma.user.findFirst({
            where: { id, storeId, deletedAt: null },
            include: {
                roles: {
                    include: { role: true },
                },
            },
        });
    }
    async update(storeId, id, data) {
        const { password, roleIds, ...userData } = data;
        if (password) {
            userData.password = await bcrypt.hash(password, 10);
        }
        return this.prisma.$transaction(async (tx) => {
            if (roleIds) {
                await tx.userRole.deleteMany({
                    where: { userId: id },
                });
                await tx.userRole.createMany({
                    data: roleIds.map((roleId) => ({
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
    async remove(storeId, id) {
        return this.prisma.user.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false },
        });
    }
};
EmployeesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], EmployeesService);
export { EmployeesService };
//# sourceMappingURL=employees.service.js.map