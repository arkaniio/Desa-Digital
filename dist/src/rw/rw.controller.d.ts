import { RwService } from './rw.service';
import { RwDto } from "../validator/rw_dto";
import type { UpdateRwDto } from "../validator/rw_dto";
export declare class RwController {
    private readonly rwService;
    constructor(rwService: RwService);
    regsiterRw(data: RwDto, user_id: number): Promise<{
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
