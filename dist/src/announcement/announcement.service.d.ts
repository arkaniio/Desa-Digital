import { PrismaService } from '../prisma/prisma.service';
export declare class AnnouncementService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewAnnouncement(data: any, user_id: number): Promise<{
        id: number;
        RtId: number;
        RwId: number;
        Title: string;
        Content: string;
        CreatedAt: Date;
        AuthorId: number;
    }>;
    deletAnnouncement(user_id: number, id: number): Promise<boolean>;
}
