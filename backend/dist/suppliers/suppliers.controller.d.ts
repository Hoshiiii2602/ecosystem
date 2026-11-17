import { SuppliersService } from './suppliers.service.js';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(req: any, createSupplierDto: any): Promise<{
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
    update(req: any, id: string, updateSupplierDto: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
