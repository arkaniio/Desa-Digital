import { RwService } from './rw.service.js';
import { CreateRwDto } from './dto/create-rw.dto.js';
import type { UpdateRwDto } from './dto/update-rw.dto.js';
export declare class RwController {
    private readonly rwService;
    constructor(rwService: RwService);
    regsiterRw(data: CreateRwDto, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateRw(data: UpdateRwDto, user_id: number, id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteRw(user_id: number, id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
