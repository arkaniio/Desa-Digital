import { PartialType } from '@nestjs/mapped-types';
import {
    IsInt,
    IsString,
    IsOptional,
    IsEnum,
    IsDateString
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
    Nomor_surat_rt: number;

    @IsInt()
    UserId: number;

    @IsInt()
    RtId: number;

    @IsInt()
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

export class UpdateSubmissionsDto extends PartialType(CreateSubmissionDto) { }