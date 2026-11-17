import { PrismaService } from '../prisma/prisma.service.js';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(storeId: string, data: any): Promise<{
        id: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }>;
    findAll(storeId: string): Promise<({
        children: {
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    })[]>;
    findOne(storeId: string, id: string): Promise<({
        products: {
            id: string;
            isActive: boolean;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            description: string | null;
            sku: string | null;
            barcode: string | null;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            categoryId: string | null;
            brand: string | null;
            unit: string | null;
            images: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        children: {
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }) | null>;
    update(storeId: string, id: string, data: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(storeId: string, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
