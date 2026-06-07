import { role } from "@prisma/client";
export declare class CreateUserDto {
    Email: string;
    Password: string;
    Username: string;
    Address: string;
    Role: role;
    Avatar?: string;
    VillageId: number;
    RtId: number;
    RwId: number;
}
export declare class LoginDto {
    Email: string;
    Password: string;
    RtId: number;
    RwId: number;
    VillageId: number;
}
