import { PrismaService } from "../prisma/prisma.service";
export declare class IdentityService {
    private prisma;
    constructor(prisma: PrismaService);
    registerIdentity(data: any, user_id: number): Promise<{
        data: {
            id: number;
            user_id: {
                id: number;
                Created_at: Date;
                Updated_at: Date;
                Full_Name: string;
                User_Id: number;
                Age: number;
                Adress: string;
            };
            full_name: string;
            age: number;
            adress: string;
        };
    }>;
    deleteIdentity(id: number): Promise<{
        id: number;
        Created_at: Date;
        Updated_at: Date;
        Full_Name: string;
        User_Id: number;
        Age: number;
        Adress: string;
    }>;
    updateIdentity(data: any, id: number): Promise<{
        data: {
            status: boolean;
            message: string;
        };
    }>;
}
