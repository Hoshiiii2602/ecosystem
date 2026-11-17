import { PrismaService } from '../prisma/prisma.service.js';
export declare class SuppliersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(storeId: string, data: any): Promise<{
        email: string | null;
        phone: string | null;
        id: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        address: string | null;
    }>;
    findAll(storeId: string, query: any): Promise<{
        items: {
            email: string | null;
            phone: string | null;
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            address: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(storeId: string, id: string): Promise<({
        purchaseOrders: {
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            branchId: string;
            code: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            status: string;
            supplierId: string | null;
        }[];
    } & {
        email: string | null;
        phone: string | null;
        id: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        address: string | null;
    }) | null>;
    update(storeId: string, id: string, data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(storeId: string, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
