import { PrismaService } from '../prisma/prisma.service';
export declare class IdentityService {
    private prisma;
    constructor(prisma: PrismaService);
    registerIdentity(data: any, user_id: number): Promise<{
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number;
        User_Id: number;
        Full_Name: string;
        RtId: number;
        RwId: number;
        Age: number;
        Address: string;
    }>;
    deleteIdentity(id: number): Promise<boolean>;
    getIdentity(id: number): Promise<{
        Village: {
            Address: string;
            Name: string;
        };
        Rw: {
            Name: string;
        };
        Rt: {
            RwId: number;
            Number: number;
        };
    } & {
        Created_at: Date;
        Updated_at: Date;
        id: number;
        VillageId: number;
        User_Id: number;
        Full_Name: string;
        RtId: number;
        RwId: number;
        Age: number;
        Address: string;
    }>;
    updateIdentity(data: any, identity_id: number, user_id: number): Promise<boolean>;
    getAllIdentity(query: any): Promise<{
        data: {
            Full_Name: string;
            RtId: number;
            Age: number;
            Address: string;
            Rt: {
                RwId: number;
                Id: number;
                Number: number;
            };
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
