import { OrdersService } from './orders.service.js';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    checkout(req: any, checkoutDto: any): Promise<{
        items: {
            id: string;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            price: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            discount: import("@prisma/client/runtime/library").Decimal;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
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
    }>;
    findAll(req: any, query: any): Promise<{
        items: ({
            customer: {
                email: string | null;
                phone: string | null;
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                address: string | null;
            } | null;
            items: ({
                product: {
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
                };
            } & {
                id: string;
                costPrice: import("@prisma/client/runtime/library").Decimal;
                productId: string;
                price: import("@prisma/client/runtime/library").Decimal;
                total: import("@prisma/client/runtime/library").Decimal;
                quantity: number;
                discount: import("@prisma/client/runtime/library").Decimal;
                variantId: string | null;
                orderId: string;
            })[];
            payments: {
                id: string;
                createdAt: Date;
                orderId: string;
                amount: import("@prisma/client/runtime/library").Decimal;
                method: string;
                reference: string | null;
            }[];
        } & {
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(req: any, id: string): Promise<({
        customer: {
            email: string | null;
            phone: string | null;
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            address: string | null;
        } | null;
        items: ({
            product: {
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
            };
        } & {
            id: string;
            costPrice: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            price: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            discount: import("@prisma/client/runtime/library").Decimal;
            variantId: string | null;
            orderId: string;
        })[];
        payments: {
            id: string;
            createdAt: Date;
            orderId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: string;
            reference: string | null;
        }[];
    } & {
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
    }) | null>;
}
