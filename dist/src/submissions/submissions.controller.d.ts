import { SubmissionsService } from './submissions.service';
import { PaginationDto } from '../common/dto/pagination-query.dto';
import { CreateSubmissionDto, UpdateKepalaDesaSignSubmissions, UpdateRtSignSubmissions, UpdateSubmissionsDto } from './dto/submissions.dto';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    getAllSubmissions(userId: number, query: PaginationDto): Promise<{
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
    createSubmissions(data: CreateSubmissionDto, userId: number, file: Express.Multer.File): Promise<{
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
    updateSubmissions(data: UpdateSubmissionsDto, id: number, userId: number, file: Express.Multer.File): Promise<boolean>;
    deleteSubmissions(id: number, userId: number): Promise<boolean>;
    updateSubmissionsWithRt(data: UpdateRtSignSubmissions, id: number, userId: number): Promise<boolean>;
    updateSubmissionsWithKepalaDesa(data: UpdateKepalaDesaSignSubmissions, id: number, userId: number): Promise<boolean>;
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
