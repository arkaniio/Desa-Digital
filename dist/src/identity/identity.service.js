"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
let IdentityService = class IdentityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerIdentity(data, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get user id from token!");
        const identity_data = await this.prisma.identityMember.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        });
        if (identity_data && identity_data != undefined || identity_data != null)
            throw new common_1.BadRequestException("Name has been already exists!");
        try {
            const isNumberValidate = data != "" && !isNaN(data);
            const validateNumber = isNumberValidate ? Number(data) : 0;
            const data_identity = await this.prisma.identityMember.create({
                data: {
                    VillageId: Number(data.VillageId),
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    RtId: validateNumber,
                    RwId: validateNumber,
                    Age: validateNumber,
                    Address: data.Address
                }
            });
            if (!data_identity && data_identity == undefined || data_identity == null)
                throw new common_1.BadRequestException("Failed to get payload identity!");
            return data_identity;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteIdentity(id) {
        if (!id && id == undefined || id == null)
            throw new common_1.BadRequestException("Failed to get the id from param");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const data = await this.prisma.identityMember.delete({
                where: {
                    id: isNumber,
                }
            });
            if (!data && data == undefined || data == null)
                throw new common_1.BadRequestException("Failed to get the data that you want to delete it!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getIdentity(id) {
        if (!id && id == undefined || id == null)
            throw new common_1.BadRequestException("Failed to get id from the param!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const find_identity = await this.prisma.identityMember.findUnique({
                where: {
                    id: isNumber
                },
                include: {
                    Village: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    },
                    Rt: {
                        select: {
                            RwId: true,
                            Number: true
                        }
                    },
                    Rw: {
                        select: {
                            Name: true
                        }
                    }
                }
            });
            if (!find_identity && find_identity == undefined || find_identity == null)
                throw new common_1.BadRequestException("Failed to find identity!");
            return find_identity;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateIdentity(data, identity_id, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        const update_data = (0, null_check_helper_1.CheckIsNullWithNumber)(data);
        if (!update_data && update_data == undefined || update_data == null)
            throw new common_1.BadRequestException("Cant find the payload!");
        try {
            const isNumber = identity_id != 0 ? Number(identity_id) : undefined;
            const update_identity = await this.prisma.identityMember.update({
                where: {
                    id: isNumber
                },
                data: update_data
            });
            if (!update_identity && update_data == undefined || update_identity == null)
                throw new common_1.BadRequestException("Failed to update!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllIdentity(query) {
        const { page, limit, search_query } = query;
        const skip = (page - 1) * limit;
        if (search_query) {
            const isValidNumber = search_query?.trim() !== "" && !isNaN(Number(search_query));
            const parsedNumber = isValidNumber ? Number(search_query) : null;
            const where = search_query
                ? {
                    OR: [
                        {
                            Full_Name: {
                                contains: search_query,
                                mode: "insensitive"
                            }
                        },
                        {
                            Address: {
                                contains: search_query,
                                mode: "insensitive"
                            }
                        },
                        ...(isValidNumber ? [
                            { Age: { equals: parsedNumber } },
                            { Rt: { equals: parsedNumber } },
                            { RtId: { equals: parsedNumber } }
                        ] : [])
                    ]
                }
                : {};
            try {
                const [data, total_data] = await Promise.all([
                    this.prisma.identityMember.findMany({
                        skip: skip,
                        take: limit,
                        where: where,
                        select: {
                            Full_Name: true,
                            RtId: true,
                            Rt: true,
                            Age: true,
                            Address: true,
                            Village: true
                        },
                    }),
                    this.prisma.identityMember.count({ where: where })
                ]);
                if (!data || total_data == undefined || total_data == null)
                    throw new common_1.BadRequestException("Failed to get the total data and data!");
                return {
                    data: data,
                    meta: {
                        total: total_data,
                        page: page,
                        limit: limit,
                        skip: skip,
                        last_page: Math.ceil(total_data / limit)
                    }
                };
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        }
        try {
            const [data, total_data] = await Promise.all([
                this.prisma.identityMember.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: {
                        id: "asc"
                    },
                    select: {
                        Full_Name: true,
                        RtId: true,
                        Rt: true,
                        Age: true,
                        Address: true
                    }
                }),
                this.prisma.identityMember.count()
            ]);
            if (!data || total_data == undefined || total_data == null)
                throw new common_1.BadRequestException("Failed to get the data and total data!");
            return {
                data: data,
                meta: {
                    total: total_data,
                    page: page,
                    limit: limit,
                    skip: skip,
                    last_page: Math.ceil(total_data / limit)
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map