import { IsIn, IsInt, Min } from "class-validator";

export type UpdateRtDto = {
    RwId?: number
    Number?: number
}

export class RtDto {

    @IsInt()
    @Min(1)
    Number: number

    @IsInt()
    @Min(1)
    RwId: number

}