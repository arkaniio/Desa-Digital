import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { UserUpdateDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(data: CreateUserDto): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
    }>;
    loginUser(data: LoginDto): Promise<string>;
    getProfile(user_id: number): Promise<{
        identities: {
            Full_Name: string;
            Age: number;
            Address: string;
            Rt: {
                RwId: number;
                Id: number;
                Number: number;
            };
        }[];
        villages: {
            Address: string;
            Name: string;
        }[];
    } & {
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
    }>;
    updateProfile(data: UserUpdateDto, user_id: number, file: Express.Multer.File): Promise<boolean>;
}
