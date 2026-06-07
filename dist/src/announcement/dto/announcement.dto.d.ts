export declare class AnnouncementDto {
    Title: string;
    Content: string;
    AuthorId: number;
    RtId: number;
    RwId: number;
}
declare const UpdateDataAnnouncement_base: import("@nestjs/mapped-types").MappedType<Partial<AnnouncementDto>>;
export declare class UpdateDataAnnouncement extends UpdateDataAnnouncement_base {
}
export {};
