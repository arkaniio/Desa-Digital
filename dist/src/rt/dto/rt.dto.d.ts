export declare class CreateRtDto {
    Number: number;
    RwId: number;
}
declare const UpdateRtDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRtDto>>;
export declare class UpdateRtDto extends UpdateRtDto_base {
}
export {};
