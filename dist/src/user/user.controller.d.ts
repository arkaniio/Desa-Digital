import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    createKepalaDesaAccount(data: any, user_id: number): Promise<{
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
    updateProfile(data: UpdateUserDto, user_id: number, file: Express.Multer.File): Promise<boolean>;
}
