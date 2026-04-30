import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateDataAnnouncement {

    @IsOptional()
    @IsString()
    Tittle?: string

    @IsOptional()
    @IsString()
    Content?: string

    @IsOptional()
    @IsString()
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
