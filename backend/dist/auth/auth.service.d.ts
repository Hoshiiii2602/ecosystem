import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
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
    refreshToken(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    private updateRefreshToken;
}
