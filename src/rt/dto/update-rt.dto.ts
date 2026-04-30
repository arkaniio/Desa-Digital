import { IsInt, IsOptional, Min } from "class-validator";

export class UpdateRtDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    RwId?: number

    @IsOptional()
    @IsInt()
    @Min(1)
    Number?: number

}
