import { AnnouncementService } from './announcement.service';
import { AnnouncementDto } from './dto/announcement.dto';
import type { UpdateDataAnnouncement } from './dto/announcement.dto';
import { PaginationDto } from '../common/dto/pagination-query.dto';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    createNewAnnouncement(data: AnnouncementDto, user_id: number, file: Express.Multer.File): Promise<{
        id: number;
        RtId: number;
        RwId: number;
        Status: import("@prisma/client").$Enums.Announcement_Status;
        Title: string;
        Content: string;
        Image: string;
        Dibuat_pada: Date;
        AuthorId: number;
    }>;
    updateAnnouncement(data: UpdateDataAnnouncement, id: number, user_id: number, file: Express.Multer.File): Promise<boolean>;
    getAllAnnouncement(user_id: number, query: PaginationDto, authorId: number): Promise<{
        data: {
            Title: string;
            Content: string;
            Dibuat_pada: Date;
            Author: {
                id: number;
                RtId: number | null;
                RwId: number | null;
                VillageId: number | null;
                Username: string;
                Email: string;
                Password: string;
                Role: import("@prisma/client").$Enums.role | null;
                Avatar: string | null;
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
    deleteAnnouncement(id: number, user_id: number): Promise<boolean>;
}
