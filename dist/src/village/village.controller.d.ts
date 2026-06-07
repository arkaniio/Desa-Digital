import { VillageService } from './village.service';
import { CreateVillageDto, UpdateVillageDto } from './dto/village.dto';
export declare class VillageController {
    private readonly villageService;
    constructor(villageService: VillageService);
    createNewVillage(data: CreateVillageDto, user_id: number): Promise<{
        id: number;
        Name: string;
        Address: string;
        Total_Population: number;
        Village_Age: number;
        Leader_VillageId: number;
    }>;
    deleteVillage(id: number, user_id: number): Promise<boolean>;
    updateVillage(data: UpdateVillageDto, id: number, user_id: number): Promise<boolean>;
    getAllVillage(user_id: number): Promise<{
        Name: string;
        Address: string;
        Village_Age: number;
        Leader_Village: {
            Avatar: string | null;
            Username: string;
            Address: never;
        };
    }[]>;
}
