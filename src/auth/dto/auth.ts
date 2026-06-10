import { IsEmail, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    Username: string

    @IsEmail()
    @IsString()
    Email: string

    @IsString()
    @MinLength(6)
    Password: string

    @IsString()
    Role?: string
}

export class ChangePasswordDto {

    @IsString()
    @MinLength(6)
    Password: string

}

export class LoginDto {

    @IsEmail()
    @IsString()
    Email: string

    @IsString()
    @MinLength(6)
    Password: string
}