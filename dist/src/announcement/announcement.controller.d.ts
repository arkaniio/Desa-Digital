import { AnnouncementService } from './announcement.service';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    createNewAnnouncement(data: AnnouncementService, user_id: number): Promise<{
        id: number;
        RtId: number;
        RwId: number;
        Title: string;
        Content: string;
        CreatedAt: Date;
        AuthorId: number;
    }>;
}
