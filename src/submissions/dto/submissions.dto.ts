import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
    IsInt,
    IsString,
    IsOptional,
    IsEnum,
    IsDateString,
    IsBoolean
} from 'class-validator';

enum Tipe_Surat {
    SURAT_DOMISILI = "SURAT_DOMISILI",
    SURAT_USAHA = "SURAT_USAHA",
    SURAT_NIKAH = "SURAT_NIKAH",
    SURAT_KEMATIAN = "SURAT_KEMATIAN",
    SURAT_KURANG_MAMPU = "SURAT_KURANG_MAMPU"
}

export class CreateSubmissionDto {
    @IsInt()
    @Type(() => Number)
    Nomor_surat_rt: number;

    @IsInt()
    @Type(() => Number)
    RtId: number;

    @IsInt()
    @Type(() => Number)
    RwId: number;

    @IsString()
    Dokumen_pengajuan: string;

    @IsEnum(Tipe_Surat)
    Tipe_Surat: Tipe_Surat;

    @IsOptional()
    @IsString()
    Status?: string;

    @IsOptional()
    @IsString()
    Keterangan_pengajuan?: string;

    @IsString()
    Keperluan: string;

    @IsDateString()
    Tanggal_pengajuan: string;

    @IsOptional()
    @IsDateString()
    Tanggal_selesai?: string;
}

export class UpdateRtSignSubmissions {

    @IsBoolean()
    Rt_desa_sign: boolean

}

export class UpdateKepalaDesaSignSubmissions {

    @IsBoolean()
    Kepala_desa_sign: boolean

}

export class UpdateSubmissionsDto extends PartialType(CreateSubmissionDto) { }