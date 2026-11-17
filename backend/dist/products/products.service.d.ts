import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(storeId: string, data: any): Promise<({
        inventories: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            minStock: number;
            maxStock: number | null;
            branchId: string;
        }[];
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            sku: string | null;
            images: Prisma.JsonValue | null;
            productId: string;
            price: Prisma.Decimal;
            attributes: Prisma.JsonValue | null;
        }[];
    } & {
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
        costPrice: Prisma.Decimal;
        salePrice: Prisma.Decimal;
        categoryId: string | null;
        brand: string | null;
        unit: string | null;
        images: Prisma.JsonValue | null;
    }) | null>;
    findAll(storeId: string, query: any): Promise<{
        items: ({
            category: {
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                parentId: string | null;
            } | null;
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string | null;
                images: Prisma.JsonValue | null;
                productId: string;
                price: Prisma.Decimal;
                attributes: Prisma.JsonValue | null;
            }[];
        } & {
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
            costPrice: Prisma.Decimal;
            salePrice: Prisma.Decimal;
            categoryId: string | null;
            brand: string | null;
            unit: string | null;
            images: Prisma.JsonValue | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(storeId: string, id: string): Promise<({
        category: {
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            parentId: string | null;
        } | null;
        inventories: ({
            branch: {
                phone: string | null;
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                address: string | null;
                isMain: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            minStock: number;
            maxStock: number | null;
            branchId: string;
        })[];
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            sku: string | null;
            images: Prisma.JsonValue | null;
            productId: string;
            price: Prisma.Decimal;
            attributes: Prisma.JsonValue | null;
        }[];
    } & {
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
        costPrice: Prisma.Decimal;
        salePrice: Prisma.Decimal;
        categoryId: string | null;
        brand: string | null;
        unit: string | null;
        images: Prisma.JsonValue | null;
    }) | null>;
    update(storeId: string, id: string, data: any): Promise<Prisma.BatchPayload>;
    remove(storeId: string, id: string): Promise<Prisma.BatchPayload>;
}
