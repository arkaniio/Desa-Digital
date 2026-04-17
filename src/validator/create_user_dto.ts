import { IsEmail, IsAlpha, IsString, MinLength } from "class-validator";

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

}