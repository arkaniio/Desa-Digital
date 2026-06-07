export declare class CreateVillageDto {
    Name: string;
    Address: string;
    Total_Population: number;
    Village_Age: number;
    Leader_VillageId: number;
}
declare const UpdateVillageDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVillageDto>>;
export declare class UpdateVillageDto extends UpdateVillageDto_base {
}
export {};
