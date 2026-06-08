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
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const null_check_helper_js_1 = require("../common/helpers/null-check.helper.js");
let VillageService = class VillageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewVillage(data, user_id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        const find_unique_name = await this.prisma.village.findUnique({
            where: {
                Name: data.Name
            }
        });
        if (find_unique_name)
            throw new common_1.BadRequestException("Name has been already exists!");
        try {
            const data_create = await this.prisma.village.create({
                data: {
                    Name: data.Name,
                    Address: data.Address,
                    Total_Population: data.Total_Population,
                    Village_Age: data.Village_Age,
                    Leader_VillageId: data.Leader_VillageId
                }
            });
            if (!data_create)
                throw new common_1.BadRequestException("Failed to create because the data is nill!");
            return data_create;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteVillage(id, user_id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        if (id == null && id == undefined)
            throw new common_1.NotFoundException("Failed to detect the id from the parameter!");
        try {
            const findDataUsingId = await this.prisma.village.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined)
                throw new common_1.NotFoundException("Failed to detect the id that you want to delete it!");
            const delete_data = await this.prisma.village.delete({
                where: {
                    id: id
                }
            });
            if (!delete_data)
                throw new common_1.BadRequestException("Can't find the data that you want to delete it!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateVillage(data, user_id, id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id data from token!");
        if (id == null && id == undefined)
            throw new common_1.NotFoundException("Failed to detect the id in the parameter request!");
        try {
            const findDataUsingId = await this.prisma.village.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined)
                throw new common_1.NotFoundException("Failed to detect the data that you want to update!");
            const update_data = (0, null_check_helper_js_1.CheckIsNullWithNumber)(data);
            if (!update_data || Object.keys(update_data).length === 0)
                throw new common_1.BadRequestException("Failed to get the payload of the update data!");
            const update = await this.prisma.village.update({
                where: {
                    id: id
                },
                data: update_data
            });
            if (!update)
                throw new common_1.BadRequestException("Failed to update data!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllVillage(user_id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id data from token!");
        try {
            const getAll_village = await this.prisma.village.findMany({
                select: {
                    Name: true,
                    Address: true,
                    Village_Age: true,
                    Leader_Village: {
                        select: {
                            Username: true,
                            Avatar: true
                        }
                    }
                }
            });
            if (!getAll_village || getAll_village == null && getAll_village == undefined)
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
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], VillageService);
//# sourceMappingURL=village.service.js.map