import { IsString, MinLength, IsInt, IsPositive, IsIn } from "class-validator";

export class IdentityDto {

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