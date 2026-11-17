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
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats(storeId, query) {
        const { startDate, endDate } = query;
        const where = {
            storeId,
            status: 'COMPLETED',
        };
        if (startDate && endDate) {
            where.createdAt = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }
        const [totalRevenue, totalOrders, totalCustomers, topProducts] = await Promise.all([
            this.prisma.order.aggregate({
                where,
                _sum: {
                    finalAmount: true,
                },
            }),
            this.prisma.order.count({ where }),
            this.prisma.customer.count({ where: { storeId } }),
            this.prisma.orderItem.groupBy({
                by: ['productId'],
                where: {
                    order: {
                        storeId,
                        status: 'COMPLETED',
                    },
                },
                _sum: {
                    quantity: true,
                    total: true,
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc',
                    },
                },
                take: 5,
            }),
        ]);
        const topProductsWithDetails = await Promise.all(topProducts.map(async (item) => {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
                select: { name: true, sku: true },
            });
            return {
                ...item,
                product,
            };
        }));
        return {
            revenue: totalRevenue._sum.finalAmount || 0,
            orders: totalOrders,
            customers: totalCustomers,
            topProducts: topProductsWithDetails,
        };
    }
    async getRevenueChart(storeId, days = 7) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        const orders = await this.prisma.order.findMany({
            where: {
                storeId,
                status: 'COMPLETED',
                createdAt: {
                    gte: date,
                },
            },
            select: {
                finalAmount: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        const chartData = orders.reduce((acc, order) => {
            const day = order.createdAt.toISOString().split('T')[0];
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += Number(order.finalAmount);
            return acc;
        }, {});
        return Object.keys(chartData).map((day) => ({
            date: day,
            revenue: chartData[day],
        }));
    }
};
ReportsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReportsService);
export { ReportsService };
//# sourceMappingURL=reports.service.js.map