import { RwService } from './rw.service.js';
import { UpdateRwDto } from './dto/rw.dto.js';
export declare class RwController {
    private readonly rwService;
    constructor(rwService: RwService);
    updateRw(data: UpdateRwDto, userId: number, id: number): Promise<boolean>;
    deleteRw(userId: number, id: number): Promise<boolean>;
}
