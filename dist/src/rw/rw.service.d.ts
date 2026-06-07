import { PrismaService } from '../prisma/prisma.service';
export declare class RwService {
    private prisma;
    constructor(prisma: PrismaService);
    registerRw(data: any, user_id: number): Promise<{
        Id: number;
        VillageId: number;
        Leader_Id: number | null;
        Name: string;
    }>;
    updateRw(data: any, user_id: number, id: number): Promise<boolean>;
    deleteRw(user_id: number, id: number): Promise<boolean>;
    getAllRw(user_id: number, query: any, village_id: number): Promise<{
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
