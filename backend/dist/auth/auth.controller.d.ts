import { AuthService } from './auth.service.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: Record<string, any>): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string | null;
            storeId: string;
            roles: any[];
            permissions: any[];
        };
        access_token: string;
        refresh_token: string;
    }>;
    refresh(body: {
        userId: string;
        refreshToken: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
