import { SubmissionsService } from './submissions.service';
import { PaginationDto } from '../common/dto/pagination-query.dto';
import { CreateSubmissionDto, UpdateKepalaDesaSignSubmissions, UpdateRtSignSubmissions, UpdateSubmissionsDto } from './dto/submissions.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    getAllSubmissions(user_id: number, query: PaginationDto): Promise<{
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
    createSubmissions(data: CreateSubmissionDto, user_id: number, file: Express.Multer.File): Promise<{
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
    updateSubmissions(data: UpdateSubmissionsDto, id: number, user_id: number, file: Express.Multer.File): Promise<boolean>;
    deleteSubmissions(id: number, user_id: number): Promise<boolean>;
    updateSubmissionsWithRt(data: UpdateRtSignSubmissions, id: number, user_id: number): Promise<boolean>;
    updateSubmissionsWithKepalaDesa(data: UpdateKepalaDesaSignSubmissions, id: number, user_id: number): Promise<boolean>;
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
