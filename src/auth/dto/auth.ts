import { IsEmail, IsString, MinLength } from "class-validator";

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
}

export class LoginDto {

    @IsEmail()
    @IsString()
    Email: string

    @IsString()
    @MinLength(6)
    Password: string
}