import { IsInt, IsString } from "class-validator";

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