import { IdentityService } from './identity.service';
import { IdentityDto } from "../validator/identity_dto";
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    registerIdentity(data: IdentityDto, req: any): Promise<{
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
    updateIdentity(id: number, data: any): Promise<{
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
