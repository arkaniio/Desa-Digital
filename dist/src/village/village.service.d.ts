import { PrismaService } from '../prisma/prisma.service';
export declare class VillageService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewVillage(data: any, user_id: number): Promise<{
        id: number;
        Address: string;
        Name: string;
        Total_Population: number;
        Village_Age: number;
        Leader_VillageId: number;
    }>;
    deleteVillage(id: number, user_id: number): Promise<boolean>;
    updateVillage(data: any, user_id: number, id: number): Promise<boolean>;
    getAllVillage(user_id: number): Promise<({
        identityVilages: {
            Full_Name: string;
            Age: number;
            Address: string;
            Village: {
                id: number;
                Address: string;
                Name: string;
                Total_Population: number;
                Village_Age: number;
                Leader_VillageId: number;
            };
            Rw: {
                Name: string;
                Id: number;
            };
            Rt: {
                RwId: number;
                Id: number;
                Number: number;
            };
        }[];
    } & {
        id: number;
        Address: string;
        Name: string;
        Total_Population: number;
        Village_Age: number;
        Leader_VillageId: number;
    })[]>;
}
