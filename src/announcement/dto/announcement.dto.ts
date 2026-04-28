import { IsInt, IsString } from "class-validator";

export type UpdateDataAnnouncement = {

    Tittle?: string
    Content?: string
    Image?: string

}

export class AnnouncementDto {

    @IsString()
    Tittle: string

    @IsString()
    Content: string

    @IsInt()
    AuthorId: number

    @IsInt()
    RtId: number

    @IsInt()
    RwId: number

}
