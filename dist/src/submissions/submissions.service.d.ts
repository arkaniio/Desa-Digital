import { PrismaService } from '../prisma/prisma.service';
export declare class SubmissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubmissions(data: any, user_id: number, file: Express.Multer.File): Promise<{
        Dokumen_pengajuan: string;
        Nomor_surat_rt: number;
        Tipe_Surat: import("@prisma/client").$Enums.Tipe_Surat;
        Status: import("@prisma/client").$Enums.Status_Surat;
        Keterangan_pengajuan: string | null;
        Keperluan: string;
        Tanggal_pengajuan: Date;
        Tanggal_selesai: Date | null;
        Rt_desa_sign: boolean;
        Kepala_desa_sign: boolean;
        QrCodeSignature: string | null;
        id: number;
        SenderId: number;
        RtId: number;
        RwId: number;
    }>;
    deleteSubmissions(user_id: number, id: number): Promise<boolean>;
    updateSubmissions(data: any, id: number, user_id: number, file: Express.Multer.File): Promise<boolean>;
    getAllSubmissions(user_id: number, query: any): Promise<{
        data: {
            Dokumen_pengajuan: string;
            Nomor_surat_rt: number;
            Keterangan_pengajuan: string | null;
            Keperluan: string;
            Rt_desa_sign: boolean;
            Kepala_desa_sign: boolean;
            QrCodeSignature: string | null;
            Rt: {
                RwId: number;
                Id: number;
                Number: number;
                VillageId: number;
                Leader_Id: number | null;
            };
            Rw: {
                Id: number;
                VillageId: number;
                Leader_Id: number | null;
                Name: string;
            };
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            skip: number;
            last_page: number;
        };
    }>;
    updateSubmissionsWithRt(user_id: number, data: any, id: number): Promise<boolean>;
    updateSubmissionsWithKepalaDesa(user_id: number, data: any, id: number): Promise<boolean>;
    verifySubmission(signature: string): Promise<{
        Nomor_surat_rt: number;
        Tipe_Surat: import("@prisma/client").$Enums.Tipe_Surat;
        Status: import("@prisma/client").$Enums.Status_Surat;
        Keterangan_pengajuan: string | null;
        Keperluan: string;
        Tanggal_pengajuan: Date;
        Tanggal_selesai: Date | null;
        Sender: {
            Username: string;
        };
        Rt: {
            Number: number;
        };
        Rw: {
            Name: string;
        };
        id: number;
    }>;
}
