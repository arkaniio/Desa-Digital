import PasswordService from "../common/services/password/password.service";
import { PrismaService } from "../prisma/prisma.service";
export declare class AdminService {
    private passwordService;
    private prismaService;
    constructor(passwordService: PasswordService, prismaService: PrismaService);
    createKepalaDesaAccount(data: any): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    }>;
    createRwAccount(data: any): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    }>;
    createRtAccount(data: any): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    }>;
}
