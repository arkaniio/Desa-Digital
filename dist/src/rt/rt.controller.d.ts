import { CreateRtDto } from './dto/create-rt.dto.js';
import { RtService } from './rt.service.js';
import type { UpdateRtDto } from './dto/update-rt.dto.js';
export declare class RtController {
    private readonly RtService;
    constructor(RtService: RtService);
    registerRt(data: CreateRtDto, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateRt(data: UpdateRtDto, user_id: number, id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteRt(id: number, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
