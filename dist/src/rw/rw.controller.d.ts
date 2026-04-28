import { RwService } from './rw.service';
import { CreateRwDto } from './dto/create-rw.dto';
import type { UpdateRwDto } from './dto/update-rw.dto';
export declare class RwController {
    private readonly rwService;
    constructor(rwService: RwService);
    regsiterRw(data: CreateRwDto, user_id: number): Promise<{
        Name: string;
        Id: number;
    }>;
    updateRw(data: UpdateRwDto, user_id: number, id: number): Promise<boolean>;
    deleteRw(user_id: number, id: number): Promise<boolean>;
}
