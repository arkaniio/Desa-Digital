import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import PasswordService from "../password/password.service";
declare class BoostrapService implements OnModuleInit {
    private readonly prismaService;
    private readonly passwordService;
    constructor(prismaService: PrismaService, passwordService: PasswordService);
    onModuleInit(): Promise<{
        id: number;
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        VillageId: number | null;
        RwId: number | null;
        RtId: number | null;
    } | undefined>;
}
export default BoostrapService;
