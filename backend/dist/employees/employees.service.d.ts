import { PrismaService } from '../prisma/prisma.service.js';
export declare class EmployeesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(storeId: string, data: any): Promise<{
        roles: ({
            role: {
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    } & {
        email: string;
        password: string;
        fullName: string | null;
        phone: string | null;
        id: string;
        avatar: string | null;
        isActive: boolean;
        refreshToken: string | null;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findAll(storeId: string): Promise<({
        roles: ({
            role: {
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    } & {
        email: string;
        password: string;
        fullName: string | null;
        phone: string | null;
        id: string;
        avatar: string | null;
        isActive: boolean;
        refreshToken: string | null;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    })[]>;
    findOne(storeId: string, id: string): Promise<({
        roles: ({
            role: {
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    } & {
        email: string;
        password: string;
        fullName: string | null;
        phone: string | null;
        id: string;
        avatar: string | null;
        isActive: boolean;
        refreshToken: string | null;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }) | null>;
    update(storeId: string, id: string, data: any): Promise<{
        roles: ({
            role: {
                id: string;
                storeId: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
        } & {
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
    } & {
        email: string;
        password: string;
        fullName: string | null;
        phone: string | null;
        id: string;
        avatar: string | null;
        isActive: boolean;
        refreshToken: string | null;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    remove(storeId: string, id: string): Promise<{
        email: string;
        password: string;
        fullName: string | null;
        phone: string | null;
        id: string;
        avatar: string | null;
        isActive: boolean;
        refreshToken: string | null;
        storeId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
