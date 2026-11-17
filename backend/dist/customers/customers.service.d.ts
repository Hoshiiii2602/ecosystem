import { PrismaService } from '../prisma/prisma.service.js';
export declare class CustomersService {
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
        orders: {
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            branchId: string;
            customerId: string | null;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            note: string | null;
            code: string;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            finalAmount: import("@prisma/client/runtime/library").Decimal;
            status: string;
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
