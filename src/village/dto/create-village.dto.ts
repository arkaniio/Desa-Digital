import { IsInt, IsString, MinLength } from "class-validator";

export class CreateVillageDto {

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
