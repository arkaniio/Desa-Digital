import { HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class AnnouncementService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewAnnouncement(data: any, user_id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deletAnnouncement(user_id: number, id: number): Promise<{
        status_code: HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
