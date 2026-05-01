import { PartialType } from "@nestjs/mapped-types";
import { IsString, MinLength } from "class-validator";

export class CreateRwDto {

    @IsString()
    @MinLength(3)
    Name: string

}

export class UpdateRwDto extends PartialType(CreateRwDto) { }
