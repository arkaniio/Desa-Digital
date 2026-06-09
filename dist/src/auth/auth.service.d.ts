import { PrismaService } from '../prisma/prisma.service';
import TokenService from '../common/services/token/token.service';
import PasswordService from '../common/services/password/password.service';
export declare class AuthService {
    private prisma;
    private tokenService;
    private passwordService;
    constructor(prisma: PrismaService, tokenService: TokenService, passwordService: PasswordService);
    findUserByEmail(email: string): Promise<{
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
    } | null>;
    findUserById(user_id: number): Promise<{
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
    } | null>;
    generateAuth(data: any): Promise<{
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
    validateOrCreate(profile: any): Promise<string>;
    registerUser(data: any): Promise<{
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
    loginUser(data: any): Promise<string>;
    changePassword(data: any, user_id: number): Promise<boolean>;
}
