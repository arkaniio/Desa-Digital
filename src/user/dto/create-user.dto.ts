import { IsEmail, IsEnum, IsInt, IsString, Min, MinLength } from "class-validator";
import { role } from "@prisma/client";

export class CreateUserDto {

    @IsEmail()
    @IsString()
    Email: string

    @IsString()
    @MinLength(6)
    Password: string

    @IsString()
    @MinLength(5)
    Username: string

    @IsString()
    Address: string

    @IsEnum(role)
    Role: role

    @IsInt()
    @Min(1)
    VillageId: number
}

