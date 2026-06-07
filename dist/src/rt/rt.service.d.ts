import { PrismaService } from '../prisma/prisma.service';
export declare class RtService {
    private prisma;
    constructor(prisma: PrismaService);
    registerRt(data: any, user_id: number): Promise<{
        RwId: number;
        Id: number;
        Number: number;
        VillageId: number;
        Leader_Id: number | null;
    }>;
    updateRt(data: any, user_id: number, id: number): Promise<boolean>;
    deleteRt(user_id: number, id: number): Promise<boolean>;
    getAllRt(user_id: number, query: any, village_id: number): Promise<{
        data: {
            Number: number;
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
