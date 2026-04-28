import { IdentityService } from './identity.service';
import { CreateIdentityDto } from './dto/create-identity.dto';
import type { UpdateIdentityDto } from './dto/update-identity.dto';
import { PaginationDto } from '../common/dto/pagination-query.dto';
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    getAllIdentity(query: PaginationDto): Promise<{
        data: {
            Full_Name: string;
            RtId: number;
            Age: number;
            Address: string;
            Rt: {
                RwId: number;
                Id: number;
                Number: number;
            };
        }[];
        meta: {
            total: number;
            page: any;
            limit: any;
            skip: number;
            last_page: number;
        };
    }>;
    registerIdentity(data: CreateIdentityDto, user_id: number): Promise<{
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number;
        User_Id: number;
        Full_Name: string;
        RtId: number;
        RwId: number;
        Age: number;
        Address: string;
    }>;
    deleteIdentity(id: number): Promise<boolean>;
    updateIdentity(data: UpdateIdentityDto, user_id: number, identity_id: number): Promise<boolean>;
    getIdentity(id: number): Promise<{
        Village: {
            Address: string;
            Name: string;
        };
        Rw: {
            Name: string;
        };
        Rt: {
            RwId: number;
            Number: number;
        };
    } & {
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number;
        User_Id: number;
        Full_Name: string;
        RtId: number;
        RwId: number;
        Age: number;
        Address: string;
    }>;
}
