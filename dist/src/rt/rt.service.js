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
exports.RtService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
let RtService = class RtService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerRt(data, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get user_id from token!");
        try {
            const data_create = await this.prisma.rt.create({
                data: {
                    RwId: data.RwId,
                    Number: data.Number
                }
            });
            if (!data_create && data_create == undefined || data_create == null)
                throw new common_1.BadRequestException("Failed to create and detect the data!");
            return data_create;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateRt(data, user_id, id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get data from token!");
        if (!id && id == undefined || id == null)
            throw new common_1.BadRequestException("Failed to get the id from the param!");
        const update_data = (0, null_check_helper_1.CheckIsNullWithNumber)(data);
        if (!update_data && update_data == undefined || update_data == null)
            throw new common_1.BadRequestException("Failed to get the payload for update!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const update = await this.prisma.rt.update({
                where: {
                    Id: isNumber
                },
                data: update_data
            });
            if (!update && update == undefined || update == null)
                throw new common_1.BadRequestException("Failed to update data!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteRt(user_id, id) {
        if (!user_id && user_id == undefined || !user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the data user from token and id from param!");
        if (!id && id == undefined || id == null)
            throw new common_1.BadRequestException("Failed to get the id from the param!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const delete_data = await this.prisma.rt.delete({
                where: {
                    Id: isNumber
                }
            });
            if (!delete_data && delete_data == undefined || delete_data == null)
                throw new common_1.BadRequestException("Not found!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.RtService = RtService;
exports.RtService = RtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RtService);
//# sourceMappingURL=rt.service.js.map