import { PrismaService } from '../prisma/prisma.service.js';
export declare class VillageService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewVillage(data: any, user_id: number): Promise<{
        id: number;
        Name: string;
        Address: string;
        Total_Population: number;
        Village_Age: number;
        Leader_VillageId: number;
    }>;
    deleteVillage(id: number, user_id: number): Promise<boolean>;
    updateVillage(data: any, user_id: number, id: number): Promise<boolean>;
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
