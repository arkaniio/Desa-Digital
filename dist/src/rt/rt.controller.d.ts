import { RtDto } from "../validator/rt_dto";
import { RtService } from './rt.service';
import type { UpdateRtDto } from "../validator/rt_dto";
export declare class RtController {
    private readonly RtService;
    constructor(RtService: RtService);
    registerRt(data: RtDto, user_id: number): Promise<{
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
