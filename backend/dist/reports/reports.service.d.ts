import { PrismaService } from '../prisma/prisma.service.js';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(storeId: string, query: any): Promise<{
        revenue: number | import("@prisma/client/runtime/library").Decimal;
        orders: number;
        customers: number;
        topProducts: any[];
    }>;
    getRevenueChart(storeId: string, days?: number): Promise<{
        date: string;
        revenue: any;
    }[]>;
}
