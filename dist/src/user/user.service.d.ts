import { PrismaService } from '../prisma/prisma.service';
import PasswordService from '../common/services/password/password.service';
export declare class UserService {
    private prisma;
    private passwordService;
    constructor(prisma: PrismaService, passwordService: PasswordService);
    getProfile(user_id: number): Promise<{
        id: number;
        Username: string;
        Email: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        VillageId: number | null;
        Village: {
            Name: string;
            Address: string;
        } | null;
        Rt: {
            RwId: number;
            Rw: {
                Village: {
                    Name: string;
                    Address: string;
                };
                Name: string;
                Leader: {
                    Username: string;
                } | null;
            };
            Number: number;
        } | null;
        LedVillages: {
            Leader_Village: {
                Username: string;
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
            } | null;
        }[];
        LedRts: {
            RwId: number;
            Rw: {
                Village: {
                    Name: string;
                    Address: string;
                };
                Name: string;
                Leader: {
                    Username: string;
                } | null;
            };
            Number: number;
        }[];
    }>;
    updateProfile(file_path: Express.Multer.File, user_id: number, data: any): Promise<boolean>;
}
