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
let SuppliersService = class SuppliersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(storeId, data) {
        return this.prisma.supplier.create({
            data: {
                ...data,
                storeId,
            },
        });
    }
    async findAll(storeId, query) {
        const { search, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {
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
    async findOne(storeId, id) {
        return this.prisma.supplier.findFirst({
            where: { id, storeId, deletedAt: null },
            include: {
                purchaseOrders: true,
            },
        });
    }
    async update(storeId, id, data) {
        return this.prisma.supplier.updateMany({
            where: { id, storeId },
            data,
        });
    }
    async remove(storeId, id) {
        return this.prisma.supplier.updateMany({
            where: { id, storeId },
            data: { deletedAt: new Date() },
        });
    }
};
SuppliersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SuppliersService);
export { SuppliersService };
//# sourceMappingURL=suppliers.service.js.map