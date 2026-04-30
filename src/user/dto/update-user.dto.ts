import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateDto {

    @IsOptional()
    @IsString()
    @MinLength(5)
    Username?: string

    @IsOptional()
    @IsEmail()
    Email?: string

    @IsOptional()
    @IsString()
    @MinLength(6)
    Password?: string

    @IsOptional()
    @IsString()
    Avatar?: string

}
