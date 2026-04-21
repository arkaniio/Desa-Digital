import { IsIn, IsString, MinLength } from "class-validator";

export class RwDto {

    @IsString()
    @MinLength(3)
    Name: string

}