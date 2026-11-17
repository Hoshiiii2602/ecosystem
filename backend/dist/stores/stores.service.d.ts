import { PrismaService } from '../prisma/prisma.service.js';
export declare class StoresService {
    private prisma;
    constructor(prisma: PrismaService);
    registerStore(data: any): Promise<{
        storeId: string;
        userId: string;
        message: string;
    }>;
    getStoreInfo(storeId: string): Promise<({
        branches: {
            phone: string | null;
            id: string;
            storeId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            isMain: boolean;
        }[];
    } & {
        email: string | null;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        domain: string | null;
        address: string | null;
    }) | null>;
}
