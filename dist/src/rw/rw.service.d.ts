import { PrismaService } from '../prisma/prisma.service';
export declare class RwService {
    private prisma;
    constructor(prisma: PrismaService);
    updateRw(data: any, user_id: number, id: number): Promise<boolean>;
    deleteRw(user_id: number, id: number): Promise<boolean>;
}
