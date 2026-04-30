import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateRwDto {

    @IsOptional()
    @IsString()
    @MinLength(3)
    Name?: string

}
