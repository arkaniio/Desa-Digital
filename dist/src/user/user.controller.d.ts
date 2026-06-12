import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(userId: number): Promise<{
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
    updateProfile(data: UpdateUserDto, user_id: number, file: Express.Multer.File): Promise<boolean>;
}
