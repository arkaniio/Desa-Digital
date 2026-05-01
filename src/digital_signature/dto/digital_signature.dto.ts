import { IsInt, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDigitalSignatureDto {
    @IsInt()
    No_surat_desa: number;

    @IsInt()
    SubmissionsId: number;

    @IsBoolean()
    Kepala_desa_sign: boolean;

    @IsBoolean()
    Rt_desa_sign: boolean;
}

export class UpdateSignatureDto extends PartialType(CreateDigitalSignatureDto) {}