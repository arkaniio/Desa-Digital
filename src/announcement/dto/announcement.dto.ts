import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsOptional, IsString } from "class-validator";

export class AnnouncementDto {

    @IsString()
    Title: string

    @IsString()
    Content: string

    @IsInt()
    AuthorId: number

    @IsInt()
    RtId: number

    @IsInt()
    RwId: number

}

export class UpdateDataAnnouncement extends PartialType(AnnouncementDto) { }
