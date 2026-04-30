import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateVillageDto {

    @IsOptional()
    @IsString()
    @MinLength(6)
    Name?: string

    @IsOptional()
    @IsString()
    Address?: string

    @IsOptional()
    @IsInt()
    Total_Population?: number

    @IsOptional()
    @IsInt()
    Village_Age?: number

}
