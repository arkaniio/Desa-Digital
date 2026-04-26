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
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const null_check_helper_js_1 = require("../common/helpers/null-check.helper.js");
const response_helper_js_1 = require("../common/helpers/response.helper.js");
let IdentityService = class IdentityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerIdentity(data, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to get the user id!", false);
        }
        const identity_data = await this.prisma.identityMember.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        });
        if (identity_data != undefined || identity_data != null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Name has been already exists!", false);
        }
        try {
            const data_identity = await this.prisma.identityMember.create({
                data: {
                    VillageId: Number(data.VillageId),
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    RtId: Number(data.RtId),
                    RwId: Number(data.RwId),
                    Age: Number(data.Age),
                    Address: data.Address
                }
            });
            if (data_identity == undefined || data_identity == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create new identity!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(data_identity, common_1.HttpStatus.OK, "Successfully to create the new identity!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new data identity!", false);
        }
    }
    async deleteIdentity(id) {
        if (id == undefined || id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to detect the id identity!", false);
        }
        try {
            const data = await this.prisma.identityMember.delete({
                where: {
                    id: Number(id),
                }
            });
            if (data == undefined || data == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to delete data identity!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(data, common_1.HttpStatus.OK, "Successfully to delete the data!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data identity!", false);
        }
    }
    async getIdentity(id) {
        if (id == undefined || id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to detect the id!", false);
        }
        try {
            const find_identity = await this.prisma.identityMember.findUnique({
                where: {
                    id: id
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
            if (find_identity == undefined || find_identity == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the find identity!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(find_identity, common_1.HttpStatus.OK, "Successfully to get the identity!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the identity!", false);
        }
    }
    async updateIdentity(data, identity_id, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to detect the user id!", false);
        }
        const update_data = (0, null_check_helper_js_1.CheckIsNullWithNumber)(data);
        try {
            const update_identity = await this.prisma.identityMember.update({
                where: {
                    id: Number(identity_id)
                },
                data: update_data
            });
            if (update_identity == undefined || update_identity == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to update the identity data!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(true, common_1.HttpStatus.OK, "Successfully to update the identity data!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to update data!", false);
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
                if (!data || total_data == undefined || total_data == null) {
                    return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data and total data!", false);
                }
                return (0, response_helper_js_1.ResponseSuccess)([{
                        data: data,
                        meta: {
                            total: total_data,
                            page: page,
                            limit: limit,
                            skip: skip,
                            last_page: Math.ceil(total_data / limit)
                        }
                    }], common_1.HttpStatus.OK, "Successfully to get all data identity!", true);
            }
            catch (error) {
                return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data identity!", false);
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
            if (!data || total_data == undefined || total_data == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data and total data!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)([{
                    data: data,
                    meta: {
                        total: total_data,
                        page: page,
                        limit: limit,
                        skip: skip,
                        last_page: Math.ceil(total_data / limit)
                    }
                }], common_1.HttpStatus.OK, "Successfully to get all data identity!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data identity!", false);
        }
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map