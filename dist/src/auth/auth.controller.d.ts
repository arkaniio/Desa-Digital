import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/auth';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(data: CreateUserDto): Promise<{
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
    loginUser(data: LoginDto): Promise<string>;
    changePassword(data: any, userId: number): Promise<boolean>;
    googleAuth(req: any): Promise<void>;
    googleCallbackAuth(req: any): Promise<{
        access_token: any;
    }>;
}
