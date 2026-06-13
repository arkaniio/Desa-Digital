import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './dto/announcement.dto';
import type { UpdateDataAnnouncement } from './dto/announcement.dto';
import { PaginationDto } from '../common/dto/pagination-query.dto';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    createNewAnnouncement(data: AnnouncementDto, userId: number, file: Express.Multer.File): Promise<{
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
    updateAnnouncement(data: UpdateDataAnnouncement, id: number, userId: number, file: Express.Multer.File): Promise<boolean>;
    getAllAnnouncement(userId: number, query: PaginationDto, authorId: number): Promise<{
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
    deleteAnnouncement(id: number, userId: number): Promise<boolean>;
}
