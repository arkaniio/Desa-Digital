import { IsIn, IsInt, IsString, MinLength } from "class-validator";

export type UpdateVillage = {

    Name?: string,
    Address?: string,
    Total_Population?: number,
    Village_Age?: number,

}

export class VillageDto {

    @IsString()
    @MinLength(6)
    Name: string

    @IsString()
    Address: string

    @IsInt()
    Total_Population: number


    @IsInt()
    Village_Age: number

    @IsInt()
    Leader_VillageId: number

}