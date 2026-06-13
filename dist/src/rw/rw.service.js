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
    async updateRw(data, user_id, id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get user_id from token!");
        try {
            const findDataUsingId = await this.prisma.rw.findFirst({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            });
            if (!findDataUsingId)
                throw new common_1.NotFoundException("Failed to detect the id that you want to delete it!");
            const update_data_Rw = (0, null_check_helper_1.CheckIsNullWithNumber)(data);
            if (!update_data_Rw || Object.keys(update_data_Rw).length === 0)
                throw new common_1.BadRequestException("Failed to get the update data payload!");
            const update_data = await this.prisma.rw.update({
                where: {
                    Id: id,
                    Leader_Id: user_id
                },
                data: update_data_Rw
            });
            if (!update_data)
                throw new common_1.BadRequestException("Failed to get the data of update!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteRw(user_id, id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        try {
            const findDataUsingId = await this.prisma.rw.findFirst({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            });
            if (!findDataUsingId)
                throw new common_1.NotFoundException("Failed to detect id that you want to delete it!");
            const delete_data = await this.prisma.rw.delete({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            });
            if (!delete_data)
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