import { IsEmail, IsEnum, IsIn, IsInt, IsString, Min, MinLength } from "class-validator";
import { role } from "@prisma/client";
import { PartialType } from "@nestjs/mapped-types";
import { isMainThread } from "node:worker_threads";
import { Type } from "class-transformer";

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
    @Type(() => Number)
    VillageId: number

    @IsInt()
    @Min(1)
    @Type(() => Number)
    RtId: number

    @IsInt()
    @Min(1)
    @Type(() => Number)
    RwId: number
}

export class LoginDto {

    @IsEmail()
    @IsString()
    Email: string

    @IsString()
    @MinLength(6)
    Password: string

    @IsInt()
    @Min(1)
    RtId: number

    @IsInt()
    @Min(1)
    RwId: number

    @IsInt()
    @Min(1)
    VillageId: number
}