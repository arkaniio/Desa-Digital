import { PrismaService } from '../prisma/prisma.service';
export declare class RtService {
    private prisma;
    constructor(prisma: PrismaService);
    updateRt(data: any, user_id: number, id: number): Promise<boolean>;
    deleteRt(user_id: number, id: number): Promise<boolean>;
}
