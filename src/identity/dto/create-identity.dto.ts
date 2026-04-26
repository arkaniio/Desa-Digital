import { IsString, MinLength, IsInt, IsPositive } from "class-validator";

export class CreateIdentityDto {

    @IsString()
    @MinLength(6)
    Full_Name: string

    @IsInt()
    @IsPositive()
    Age: number

    @IsInt()
    @IsPositive()
    Rt: number

    @IsString()
    Address: string

}
