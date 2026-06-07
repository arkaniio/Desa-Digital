declare enum Tipe_Surat {
    SURAT_DOMISILI = "SURAT_DOMISILI",
    SURAT_USAHA = "SURAT_USAHA",
    SURAT_NIKAH = "SURAT_NIKAH",
    SURAT_KEMATIAN = "SURAT_KEMATIAN",
    SURAT_KURANG_MAMPU = "SURAT_KURANG_MAMPU"
}
export declare class CreateSubmissionDto {
    Nomor_surat_rt: number;
    RtId: number;
    RwId: number;
    Dokumen_pengajuan: string;
    Tipe_Surat: Tipe_Surat;
    Status?: string;
    Keterangan_pengajuan?: string;
    Keperluan: string;
    Tanggal_pengajuan: string;
    Tanggal_selesai?: string;
}
export declare class UpdateRtSignSubmissions {
    Rt_desa_sign: boolean;
}
export declare class UpdateKepalaDesaSignSubmissions {
    Kepala_desa_sign: boolean;
}
declare const UpdateSubmissionsDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSubmissionDto>>;
export declare class UpdateSubmissionsDto extends UpdateSubmissionsDto_base {
}
export {};
