import DashboardService from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardData(user_id: number, role: string): Promise<{
        total_warga: number;
        total_kepala: number;
        total_rt: number;
        total_rw: number;
    } | {
        total_submissions_approved_kepala: number;
        submissions_data: {
            id: number;
            Nomor_surat_rt: number;
            SenderId: number;
            RtId: number;
            RwId: number;
            Dokumen_pengajuan: string;
            Tipe_Surat: import("@prisma/client").$Enums.Tipe_Surat;
            Status: import("@prisma/client").$Enums.Status_Surat;
            Keterangan_pengajuan: string | null;
            Keperluan: string;
            Tanggal_pengajuan: Date;
            Tanggal_selesai: Date | null;
            Rt_desa_sign: boolean;
            Kepala_desa_sign: boolean;
            QrCodeSignature: string | null;
        }[];
        total_submissions_lates: number;
        total_warga: number;
    } | {
        total_warga: number;
        total_announcement: number;
    } | {
        total_submissions_pending: number;
        total_submissions_diajukan: number;
        total_submissions_approved_rt: number;
        total_submissions_approved_kepala: number;
        latest_submissions_announcement: number;
    } | undefined>;
}
