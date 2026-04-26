import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class RtService {
    private prisma;
    constructor(prisma: PrismaService);
    registerRt(data: any, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateRt(data: any, user_id: number, id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteRt(user_id: number, id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
