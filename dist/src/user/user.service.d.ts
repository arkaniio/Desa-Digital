import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerUser(data: any): Promise<{
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
    }>;
    loginUser(data: any): Promise<string>;
    getProfile(user_id: number): Promise<{
        identities: {
            Full_Name: string;
            Age: number;
            Address: string;
            Rt: {
                RwId: number;
                Id: number;
                Number: number;
            };
        }[];
        villages: {
            Address: string;
            Name: string;
        }[];
    } & {
        Username: string;
        Email: string;
        Password: string;
        Role: import("@prisma/client").$Enums.role | null;
        Avatar: string | null;
        Created_at: Date;
        Updated_at: Date;
        id: number;
    }>;
    updateProfile(file_path: Express.Multer.File, user_id: number, data: any): Promise<boolean>;
}
