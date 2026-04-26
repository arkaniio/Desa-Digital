import { IdentityService } from './identity.service.js';
import { CreateIdentityDto } from './dto/create-identity.dto.js';
import type { UpdateIdentityDto } from './dto/update-identity.dto.js';
import { PaginationDto } from '../common/dto/pagination-query.dto.js';
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    getAllIdentity(query: PaginationDto): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    registerIdentity(data: CreateIdentityDto, user_id: number): Promise<{
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
    updateIdentity(data: UpdateIdentityDto, user_id: number, identity_id: number): Promise<{
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
}
