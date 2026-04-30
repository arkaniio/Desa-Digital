import { IsInt, IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Tipe_Surat } from '@prisma/client';

export class CreateSubmissionDto {
    @IsInt()
    Nomor_surat_rt: number;

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
    Tanggal_Selesai?: string;
}