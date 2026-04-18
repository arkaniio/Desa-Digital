import { PrismaService } from "../prisma/prisma.service";
export declare class IdentityService {
    private prisma;
    constructor(prisma: PrismaService);
    registerIdentity(data: any, user_id: number): Promise<{
        data: {
            id: number;
            user_id: {
                Full_Name: string;
                Age: number;
                Adress: string;
                Created_at: Date;
                Updated_at: Date;
                id: number;
                User_Id: number;
            };
            full_name: string;
            age: number;
            adress: string;
        };
    } | undefined>;
    deleteIdentity(id: number): Promise<{
        Full_Name: string;
        Age: number;
        Adress: string;
        Created_at: Date;
        Updated_at: Date;
        id: number;
        User_Id: number;
    }>;
    updateIdentity(data: any, id: number): Promise<{
        data: {
            status: boolean;
            message: string;
        };
    }>;
}
