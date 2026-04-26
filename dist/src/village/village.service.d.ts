import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class VillageService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewVillage(data: any, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteVillage(id: number, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateVillage(data: any, user_id: number, id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getAllVillage(user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
