import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class RwService {
    private prisma;
    constructor(prisma: PrismaService);
    registerRw(data: any, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateRw(data: any, user_id: number, id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteRw(user_id: number, id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
