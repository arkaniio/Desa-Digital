import { VillageService } from './village.service.js';
import { CreateVillageDto } from './dto/create-village.dto.js';
import type { UpdateVillageDto } from './dto/update-village.dto.js';
export declare class VillageController {
    private readonly villageService;
    constructor(villageService: VillageService);
    createNewVillage(data: CreateVillageDto, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    deleteVillage(id: number, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    updateVillage(data: UpdateVillageDto, id: number, user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
    getAllVillage(user_id: number): Promise<{
        status_code: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
        success: boolean;
    }>;
}
