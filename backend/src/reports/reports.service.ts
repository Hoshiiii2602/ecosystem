import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(storeId: string, query: any) {
    const { startDate, endDate } = query;

    const where: any = {
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

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item: any) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true, sku: true },
        });
        return {
          ...item,
          product,
        };
      }),
    );

    return {
      revenue: totalRevenue._sum.finalAmount || 0,
      orders: totalOrders,
      customers: totalCustomers,
      topProducts: topProductsWithDetails,
    };
  }

  async getRevenueChart(storeId: string, days: number = 7) {
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

    // Group by date
    const chartData = orders.reduce((acc: any, order: any) => {
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
}
