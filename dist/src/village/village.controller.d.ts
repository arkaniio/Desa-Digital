import { VillageService } from './village.service';
import { CreateVillageDto, UpdateVillageDto } from './dto/village.dto';
export declare class VillageController {
    private readonly villageService;
    constructor(villageService: VillageService);
    createNewVillage(data: CreateVillageDto, userId: number): Promise<{
        id: number;
        Name: string;
        Address: string;
        Total_Population: number;
        Village_Age: number;
        Leader_VillageId: number;
    }>;
    deleteVillage(id: number, userId: number): Promise<boolean>;
    updateVillage(data: UpdateVillageDto, id: number, userId: number): Promise<boolean>;
}
