import { IsString, MinLength } from "class-validator";

export class CreateRwDto {

    @IsString()
    @MinLength(3)
    Name: string

}
