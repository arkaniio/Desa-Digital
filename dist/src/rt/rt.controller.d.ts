import { UpdateRtDto } from './dto/rt.dto';
import { RtService } from './rt.service';
export declare class RtController {
    private readonly RtService;
    constructor(RtService: RtService);
    updateRt(data: UpdateRtDto, userId: number, id: number): Promise<boolean>;
    deleteRt(id: number, userId: number): Promise<boolean>;
}
