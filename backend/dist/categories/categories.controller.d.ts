import { CategoriesService } from './categories.service.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(req: any, createCategoryDto: any): Promise<{
        id: string;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        parentId: string | null;
    }>;
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<({
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
    update(req: any, id: string, updateCategoryDto: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(req: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
