import { RtDto } from "../validator/rt_dto";
import { RtService } from './rt.service';
export declare class RtController {
    private readonly RtService;
    constructor(RtService: RtService);
    registerRt(data: RtDto, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
