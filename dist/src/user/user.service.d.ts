import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerUser(data: any): Promise<{
        message: string;
        status: boolean;
        data: {
            id: number;
            username: string;
            email: string;
            role: string;
            created_at: Date;
            updated_at: Date;
        };
    } | undefined>;
    loginUser(data: any): Promise<{
        message: string;
        status: boolean;
        access_token: string;
        user: {
            Username: string;
            Email: string;
            Created_at: Date;
            Updated_at: Date;
        };
    }>;
    getProfile(id: number): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: string;
        Created_at: Date;
        Updated_at: Date;
        id: number;
    } | null>;
    updateProfile(user_id: number, data: any): Promise<{
        data: {
            username: {
                Username: string;
                Email: string;
                Password: string;
                Role: string;
                Created_at: Date;
                Updated_at: Date;
                id: number;
            };
            email: string;
            password: string;
            updated_at: Date;
        };
    }>;
}
