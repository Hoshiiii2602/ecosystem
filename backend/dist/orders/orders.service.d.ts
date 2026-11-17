import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    checkout(storeId: string, userId: string, checkoutDto: any): Promise<{
        items: {
            id: string;
            costPrice: Prisma.Decimal;
            productId: string;
            price: Prisma.Decimal;
            total: Prisma.Decimal;
            quantity: number;
            discount: Prisma.Decimal;
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
        discount: Prisma.Decimal;
        tax: Prisma.Decimal;
        note: string | null;
        code: string;
        totalAmount: Prisma.Decimal;
        finalAmount: Prisma.Decimal;
        status: string;
    }>;
    findAll(storeId: string, query: any): Promise<{
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
                    costPrice: Prisma.Decimal;
                    salePrice: Prisma.Decimal;
                    categoryId: string | null;
                    brand: string | null;
                    unit: string | null;
                    images: Prisma.JsonValue | null;
                };
            } & {
                id: string;
                costPrice: Prisma.Decimal;
                productId: string;
                price: Prisma.Decimal;
                total: Prisma.Decimal;
                quantity: number;
                discount: Prisma.Decimal;
                variantId: string | null;
                orderId: string;
            })[];
            payments: {
                id: string;
                createdAt: Date;
                orderId: string;
                amount: Prisma.Decimal;
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
            discount: Prisma.Decimal;
            tax: Prisma.Decimal;
            note: string | null;
            code: string;
            totalAmount: Prisma.Decimal;
            finalAmount: Prisma.Decimal;
            status: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(storeId: string, id: string): Promise<({
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
                costPrice: Prisma.Decimal;
                salePrice: Prisma.Decimal;
                categoryId: string | null;
                brand: string | null;
                unit: string | null;
                images: Prisma.JsonValue | null;
            };
        } & {
            id: string;
            costPrice: Prisma.Decimal;
            productId: string;
            price: Prisma.Decimal;
            total: Prisma.Decimal;
            quantity: number;
            discount: Prisma.Decimal;
            variantId: string | null;
            orderId: string;
        })[];
        payments: {
            id: string;
            createdAt: Date;
            orderId: string;
            amount: Prisma.Decimal;
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
        discount: Prisma.Decimal;
        tax: Prisma.Decimal;
        note: string | null;
        code: string;
        totalAmount: Prisma.Decimal;
        finalAmount: Prisma.Decimal;
        status: string;
    }) | null>;
}
