import { PrismaService } from '../prisma/prisma.service';
export declare class SubmissionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubmissions(data: any, user_id: number, file: Express.Multer.File): Promise<{
        id: number;
        RwId: number;
        RtId: number;
        Status: import("@prisma/client").$Enums.Status_Surat;
        Nomor_surat_rt: number;
        Dokumen_pengajuan: string;
        Tipe_Surat: import("@prisma/client").$Enums.Tipe_Surat;
        Keterangan_pengajuan: string | null;
        Keperluan: string;
        Tanggal_pengajuan: Date;
        Tanggal_selesai: Date | null;
        Rt_desa_sign: boolean;
        Kepala_desa_sign: boolean;
        QrCodeSignature: string | null;
        SenderId: number;
    }>;
    deleteSubmissions(user_id: number, id: number): Promise<boolean>;
    updateSubmissions(data: any, id: number, user_id: number, file: Express.Multer.File): Promise<boolean>;
    getAllSubmissions(user_id: number, query: any): Promise<{
        data: {
            Rw: {
                VillageId: number;
                Name: string;
                Id: number;
                Leader_Id: number | null;
            };
            Rt: {
                VillageId: number;
                RwId: number;
                Id: number;
                Number: number;
                Leader_Id: number | null;
            };
            Nomor_surat_rt: number;
            Dokumen_pengajuan: string;
            Keterangan_pengajuan: string | null;
            Keperluan: string;
            Rt_desa_sign: boolean;
            Kepala_desa_sign: boolean;
            QrCodeSignature: string | null;
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
        id: number;
        Rw: {
            Name: string;
        };
        Rt: {
            Number: number;
        };
        Status: import("@prisma/client").$Enums.Status_Surat;
        Nomor_surat_rt: number;
        Tipe_Surat: import("@prisma/client").$Enums.Tipe_Surat;
        Keterangan_pengajuan: string | null;
        Keperluan: string;
        Tanggal_pengajuan: Date;
        Tanggal_selesai: Date | null;
        Sender: {
            Username: string;
        };
    }>;
}
