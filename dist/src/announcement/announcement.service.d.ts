import { PrismaService } from '../prisma/prisma.service';
export declare class AnnouncementService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewAnnouncement(data: any, user_id: number, file: Express.Multer.File): Promise<{
        id: number;
        RwId: number;
        RtId: number;
        Status: import("@prisma/client").$Enums.Announcement_Status;
        Title: string;
        Content: string;
        Image: string;
        Dibuat_pada: Date;
        AuthorId: number;
    }>;
    deleteAnnouncement(user_id: number, id: number): Promise<boolean>;
    updateAnnouncement(user_id: number, id: number, data: any, file: Express.Multer.File): Promise<boolean>;
    getAllAnnouncement(user_id: number, query: any, autorId: number): Promise<{
        data: {
            Title: string;
            Content: string;
            Dibuat_pada: Date;
            Author: {
                id: number;
                Username: string;
                Email: string;
                Password: string;
                Role: import("@prisma/client").$Enums.role | null;
                Avatar: string | null;
                Created_at: Date;
                Updated_at: Date;
                VillageId: number | null;
                RwId: number | null;
                RtId: number | null;
            };
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            skip: number;
            last_page: number;
        };
    }>;
}
