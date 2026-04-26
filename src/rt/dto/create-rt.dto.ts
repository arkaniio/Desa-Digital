import { IsInt, Min } from "class-validator";

export class CreateRtDto {

    @IsInt()
    @Min(1)
    Number: number

    @IsInt()
    @Min(1)
    RwId: number

}
