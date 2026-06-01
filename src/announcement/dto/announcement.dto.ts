import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class AnnouncementDto {

    @IsString()
    Title: string

    @IsString()
    Content: string

    @IsInt()
    @Min(1)
    @Type(() => Number)
    AuthorId: number

    @IsInt()
    @Min(1)
    @Type(() => Number)
    RtId: number

    @IsInt()
    @Min(1)
    @Type(() => Number)
    RwId: number

}

export class UpdateDataAnnouncement extends PartialType(AnnouncementDto) { }
