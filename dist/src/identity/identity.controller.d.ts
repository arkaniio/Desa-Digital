import { IdentityService } from './identity.service';
import { IdentityDto } from "../validator/identity_dto";
import type { updateIdentitDto } from "../validator/identity_dto";
import { PaginationDto } from "../validator/pagination_dto&search";
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    registerIdentity(data: IdentityDto, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteIdentity(id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateIdentity(data: updateIdentitDto, user_id: number, identity_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getIdentity(id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getAllIdentity(query: PaginationDto): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
