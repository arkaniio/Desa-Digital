import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerUser(data: any): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    loginUser(data: any): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getProfile(user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateProfile(user_id: number, data: any): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
