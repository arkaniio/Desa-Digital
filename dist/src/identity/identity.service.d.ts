import { HttpStatus } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
export declare class IdentityService {
    private prisma;
    constructor(prisma: PrismaService);
    registerIdentity(data: any, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteIdentity(id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getIdentity(id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateIdentity(data: any, identity_id: number, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
