import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsInt, IsString, MinLength } from "class-validator";

export class CreateVillageDto {

    @IsString()
    @MinLength(6)
    Name: string

    @IsString()
    Address: string

    @IsInt()
    @Type(() => Number)
    Total_Population: number

    @IsInt()
    @Type(() => Number)
    Village_Age: number

    @IsInt()
    @Type(() => Number)
    Leader_VillageId: number

}

export class UpdateVillageDto extends PartialType(CreateVillageDto) { }
