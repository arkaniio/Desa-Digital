import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from "../validator/user_dto";
import type { UserUpdateDto } from "../validator/user_dto";
import { PaginationDto } from "../validator/pagination_dto&search";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(data: CreateUserDto): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    loginUser(data: LoginDto): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getProfile(user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateProfile(data: UserUpdateDto, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getAllUser(query: PaginationDto): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
