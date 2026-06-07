import { CreateRtDto, UpdateRtDto } from './dto/rt.dto';
import { RtService } from './rt.service';
import { PaginationDto } from '../common/dto/pagination-query.dto';
export declare class RtController {
    private readonly RtService;
    constructor(RtService: RtService);
    registerRt(data: CreateRtDto, user_id: number): Promise<{
        RwId: number;
        Id: number;
        Number: number;
        VillageId: number;
        Leader_Id: number | null;
    }>;
    updateRt(data: UpdateRtDto, user_id: number, id: number): Promise<boolean>;
    deleteRt(id: number, user_id: number): Promise<boolean>;
    getAllRt(user_id: number, query: PaginationDto, village_id: number): Promise<{
        data: {
            Number: number;
            Village: {
                Name: string;
                Address: string;
                Leader_Village: {
                    Avatar: string | null;
                    Username: string;
                    Address: never;
                };
            };
            Leader: {
                Avatar: string | null;
                Username: string;
                Address: never;
            } | null;
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            skip: number;
            last_page: number;
        };
    }>;
}
