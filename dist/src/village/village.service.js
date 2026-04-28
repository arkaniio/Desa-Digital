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
exports.VillageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
let VillageService = class VillageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewVillage(data, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        const find_unique_name = await this.prisma.village.findFirst({
            where: {
                Name: data.Name
            }
        });
        if (find_unique_name != undefined || find_unique_name != null)
            throw new common_1.BadRequestException("Name has been already exists!");
        try {
            const isNumberValidate = data != "" && !isNaN(data);
            const validateNumber = isNumberValidate ? Number(data) : 0;
            const data_create = await this.prisma.village.create({
                data: {
                    Name: data.Name,
                    Address: data.Address,
                    Total_Population: validateNumber,
                    Village_Age: validateNumber,
                    Leader_VillageId: validateNumber
                }
            });
            if (!data_create && data_create == undefined || data_create == null)
                throw new common_1.BadRequestException("Failed to create because the data is nill!");
            return data_create;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteVillage(id, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const delete_data = await this.prisma.village.delete({
                where: {
                    id: isNumber
                }
            });
            if (!delete_data && delete_data == undefined || delete_data == null)
                throw new common_1.BadRequestException("Not Found!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateVillage(data, user_id, id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id data from token!");
        const update_data = (0, null_check_helper_1.CheckIsNull)(data);
        if (!update_data && update_data == undefined || update_data == null)
            throw new common_1.BadRequestException("Failed to get the payload of the update data!");
        try {
            const isNumber = id != 0 ? Number(id) : undefined;
            const update = await this.prisma.village.update({
                where: {
                    id: isNumber
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
    async getAllVillage(user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id data from token!");
        try {
            const getAll_village = await this.prisma.village.findMany({
                include: {
                    identityVilages: {
                        select: {
                            Full_Name: true,
                            Age: true,
                            Address: true,
                            Village: true,
                            Rt: true,
                            Rw: true
                        }
                    }
                }
            });
            if (getAll_village == undefined || getAll_village == null)
                throw new common_1.BadRequestException("Failed to get village!");
            return getAll_village;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.VillageService = VillageService;
exports.VillageService = VillageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VillageService);
//# sourceMappingURL=village.service.js.map