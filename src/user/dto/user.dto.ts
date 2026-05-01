import { IsEmail, IsEnum, IsInt, IsString, Min, MinLength } from "class-validator";
import { role } from "@prisma/client";
import { PartialType } from "@nestjs/mapped-types";

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

    @IsString()
    Avatar?: string

    @IsInt()
    @Min(1)
    VillageId: number
}

export class LoginDto {

    @IsEmail()
    @IsString()
    Email: string

    @IsString()
    @MinLength(6)
    Password: string

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }