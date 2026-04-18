import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from "../validator/user_dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(data: CreateUserDto): Promise<{
        message: string;
        status: boolean;
        data: {
            id: number;
            username: string;
            email: string;
            role: string;
            created_at: Date;
            updated_at: Date;
        };
    } | undefined>;
    loginUser(data: LoginDto): Promise<{
        message: string;
        status: boolean;
        access_token: string;
        user: {
            Username: string;
            Email: string;
            Created_at: Date;
            Updated_at: Date;
        };
    }>;
    getProfile(user_id: number): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: string;
        Created_at: Date;
        Updated_at: Date;
        id: number;
    } | null>;
    updateProfile(data: any, user_id: number): Promise<{
        data: {
            username: {
                Username: string;
                Email: string;
                Password: string;
                Role: string;
                Created_at: Date;
                Updated_at: Date;
                id: number;
            };
            email: string;
            password: string;
            updated_at: Date;
        };
    }>;
}
