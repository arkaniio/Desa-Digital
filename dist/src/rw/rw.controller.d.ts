import { RwService } from './rw.service.js';
import { CreateRwDto, UpdateRwDto } from './dto/rw.dto.js';
import { PaginationDto } from '../common/dto/pagination-query.dto.js';
export declare class RwController {
    private readonly rwService;
    constructor(rwService: RwService);
    regsiterRw(data: CreateRwDto, user_id: number): Promise<{
        Id: number;
        VillageId: number;
        Leader_Id: number | null;
        Name: string;
    }>;
    updateRw(data: UpdateRwDto, user_id: number, id: number): Promise<boolean>;
    deleteRw(user_id: number, id: number): Promise<boolean>;
    getAllRw(user_id: number, query: PaginationDto, village_id: number): Promise<{
        data: {
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
            Name: string;
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
