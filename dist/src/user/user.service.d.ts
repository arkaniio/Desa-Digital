import { PrismaService } from '../prisma/prisma.service';
import PasswordService from '../common/services/password/password.service';
export declare class UserService {
    private prisma;
    private passwordService;
    constructor(prisma: PrismaService, passwordService: PasswordService);
    createKepalaDesaAccount(user_id: number, data: any): Promise<{
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
    getProfile(user_id: number): Promise<{
        Username: string;
        Email: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        Village: {
            Name: string;
            Address: string;
        } | null;
        Rt: {
            Rw: {
                Village: {
                    Name: string;
                    Address: string;
                };
                Name: string;
                Leader: {
                    Username: string;
                    Address: never;
                } | null;
            };
            RwId: number;
            Number: number;
        } | null;
        LedVillages: {
            Leader_Village: {
                Username: string;
                Address: never;
            };
        }[];
        LedRws: {
            Village: {
                Name: string;
                Address: string;
            };
            Name: string;
            Leader: {
                Username: string;
                Address: never;
            } | null;
        }[];
        LedRts: {
            Rw: {
                Village: {
                    Name: string;
                    Address: string;
                };
                Name: string;
                Leader: {
                    Username: string;
                    Address: never;
                } | null;
            };
            RwId: number;
            Number: number;
        }[];
        id: number;
        VillageId: number | null;
        Address: never;
    }>;
    updateProfile(file_path: Express.Multer.File, user_id: number, data: any): Promise<boolean>;
}
