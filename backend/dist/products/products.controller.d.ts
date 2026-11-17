import { ProductsService } from './products.service.js';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(req: any, createProductDto: any): Promise<({
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
            images: import("@prisma/client/runtime/library").JsonValue | null;
            productId: string;
            price: import("@prisma/client/runtime/library").Decimal;
            attributes: import("@prisma/client/runtime/library").JsonValue | null;
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
        costPrice: import("@prisma/client/runtime/library").Decimal;
        salePrice: import("@prisma/client/runtime/library").Decimal;
        categoryId: string | null;
        brand: string | null;
        unit: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
    }) | null>;
    findAll(req: any, query: any): Promise<{
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
                images: import("@prisma/client/runtime/library").JsonValue | null;
                productId: string;
                price: import("@prisma/client/runtime/library").Decimal;
                attributes: import("@prisma/client/runtime/library").JsonValue | null;
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
            costPrice: import("@prisma/client/runtime/library").Decimal;
            salePrice: import("@prisma/client/runtime/library").Decimal;
            categoryId: string | null;
            brand: string | null;
            unit: string | null;
            images: import("@prisma/client/runtime/library").JsonValue | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(req: any, id: string): Promise<({
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
            images: import("@prisma/client/runtime/library").JsonValue | null;
            productId: string;
            price: import("@prisma/client/runtime/library").Decimal;
            attributes: import("@prisma/client/runtime/library").JsonValue | null;
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
        costPrice: import("@prisma/client/runtime/library").Decimal;
        salePrice: import("@prisma/client/runtime/library").Decimal;
        categoryId: string | null;
        brand: string | null;
        unit: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
    }) | null>;
    update(req: any, id: string, updateProductDto: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
