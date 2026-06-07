import { PrismaService } from '../prisma/prisma.service';
export declare class AnnouncementService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewAnnouncement(data: any, user_id: number, file: Express.Multer.File): Promise<{
        Image: string;
        Status: import("@prisma/client").$Enums.Announcement_Status;
        id: number;
        RtId: number;
        RwId: number;
        Content: string;
        Title: string;
        Dibuat_pada: Date;
        AuthorId: number;
    }>;
    deleteAnnouncement(user_id: number, id: number): Promise<boolean>;
    updateAnnouncement(user_id: number, id: number, data: any, file: Express.Multer.File): Promise<boolean>;
    getAllAnnouncement(user_id: number, query: any, autorId: number): Promise<{
        data: {
            Content: string;
            Title: string;
            Dibuat_pada: Date;
            Author: {
                Avatar: string | null;
                id: number;
                RtId: number | null;
                RwId: number | null;
                VillageId: number | null;
                Username: string;
                Email: string;
                Password: string;
                Role: import("@prisma/client").$Enums.role | null;
                Created_at: Date;
                Updated_at: Date;
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
