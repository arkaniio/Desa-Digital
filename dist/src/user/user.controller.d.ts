import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(user_id: number): Promise<{
        id: number;
        Rt: {
            RwId: number;
            Rw: {
                Village: {
                    Name: string;
                    Address: string;
                };
                Leader: {
                    Username: string;
                    Address: never;
                } | null;
                Name: string;
            };
            Number: number;
        } | null;
        VillageId: number | null;
        Village: {
            Name: string;
            Address: string;
        } | null;
        Username: string;
        Email: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
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
            Leader: {
                Username: string;
                Address: never;
            } | null;
            Name: string;
        }[];
        LedRts: {
            RwId: number;
            Rw: {
                Village: {
                    Name: string;
                    Address: string;
                };
                Leader: {
                    Username: string;
                    Address: never;
                } | null;
                Name: string;
            };
            Number: number;
        }[];
        Address: never;
    }>;
    createKepalaDesaAccount(data: any, user_id: number): Promise<{
        id: number;
        RtId: number | null;
        RwId: number | null;
        VillageId: number | null;
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
    }>;
    updateProfile(data: UpdateUserDto, user_id: number, file: Express.Multer.File): Promise<boolean>;
}
