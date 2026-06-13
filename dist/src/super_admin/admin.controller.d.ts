import { AdminService } from "./admin.service";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createKepalaDesaAccount(data: any): Promise<{
        id: number;
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    }>;
    createRtAccount(data: any): Promise<{
        id: number;
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    }>;
    createRwAccount(data: any): Promise<{
        id: number;
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    }>;
}
