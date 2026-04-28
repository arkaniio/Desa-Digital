import { PrismaService } from '../prisma/prisma.service';
export declare class RtService {
    private prisma;
    constructor(prisma: PrismaService);
    registerRt(data: any, user_id: number): Promise<{
        RwId: number;
        Id: number;
        Number: number;
    }>;
    updateRt(data: any, user_id: number, id: number): Promise<boolean>;
    deleteRt(user_id: number, id: number): Promise<boolean>;
}
