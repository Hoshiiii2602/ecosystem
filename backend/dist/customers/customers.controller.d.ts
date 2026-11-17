import { CustomersService } from './customers.service.js';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(req: any, createCustomerDto: any): Promise<{
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
    findAll(req: any, query: any): Promise<{
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
    findOne(req: any, id: string): Promise<({
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
    update(req: any, id: string, updateCustomerDto: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
