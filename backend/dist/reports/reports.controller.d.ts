import { ReportsService } from './reports.service.js';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getDashboardStats(req: any, query: any): Promise<{
        revenue: number | import("@prisma/client/runtime/library").Decimal;
        orders: number;
        customers: number;
        topProducts: any[];
    }>;
    getRevenueChart(req: any, days: number): Promise<{
        date: string;
        revenue: any;
    }[]>;
}
