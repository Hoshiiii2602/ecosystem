import { StoresService } from './stores.service.js';
import { RegisterDto } from '../auth/dto/register.dto.js';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    register(data: RegisterDto): Promise<{
        storeId: string;
        userId: string;
        message: string;
    }>;
    getStoreInfo(req: any): Promise<({
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
