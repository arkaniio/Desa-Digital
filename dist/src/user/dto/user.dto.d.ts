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
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
