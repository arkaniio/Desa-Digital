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
exports.RwService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
let RwService = class RwService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerRw(data, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id data from token!");
        try {
            const data_create = await this.prisma.rw.create({
                data: {
                    Name: data.Name
                }
            });
            if (!data_create && data_create == undefined || data_create == null)
                throw new common_1.BadRequestException("Failed to create data because data is nill!");
            return data_create;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateRw(data, user_id, id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get user_id from token!");
        if (!id && id == undefined || id == null)
            throw new common_1.BadRequestException("Failed to get the param id!");
        const update_data_Rw = (0, null_check_helper_1.CheckIsNullWithNumber)(data);
        if (!update_data_Rw && update_data_Rw == undefined || update_data_Rw == null)
            throw new common_1.BadRequestException("Failed to get the update data payload!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const update_data = await this.prisma.rw.update({
                where: {
                    Id: isNumber
                },
                data: update_data_Rw
            });
            if (!update_data && update_data == undefined || update_data == undefined)
                throw new common_1.BadRequestException("Failed to get the data of update!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteRw(user_id, id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        if (!id && id == undefined || id == null)
            throw new common_1.BadRequestException("Failed to get the id from the param!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const delete_data = await this.prisma.rw.delete({
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
exports.RwService = RwService;
exports.RwService = RwService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RwService);
//# sourceMappingURL=rw.service.js.map