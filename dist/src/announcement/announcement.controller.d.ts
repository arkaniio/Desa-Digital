import { AnnouncementService } from './announcement.service.js';
export declare class AnnouncementController {
    private readonly announcementService;
    constructor(announcementService: AnnouncementService);
    createNewAnnouncement(data: AnnouncementService, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
