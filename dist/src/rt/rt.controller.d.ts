import { CreateRtDto } from './dto/create-rt.dto';
import { RtService } from './rt.service';
import type { UpdateRtDto } from './dto/update-rt.dto';
export declare class RtController {
    private readonly RtService;
    constructor(RtService: RtService);
    registerRt(data: CreateRtDto, user_id: number): Promise<{
        RwId: number;
        Id: number;
        Number: number;
    }>;
    updateRt(data: UpdateRtDto, user_id: number, id: number): Promise<boolean>;
    deleteRt(id: number, user_id: number): Promise<boolean>;
}
