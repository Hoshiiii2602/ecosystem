import { EmployeesService } from './employees.service.js';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(req: any, createEmployeeDto: any): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<({
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
    update(req: any, id: string, updateEmployeeDto: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
