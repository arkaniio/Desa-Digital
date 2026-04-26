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
const response_helper_js_1 = require("../common/helpers/response.helper.js");
let VillageService = class VillageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewVillage(data, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user id from token!", false);
        }
        const find_unique_name = await this.prisma.village.findFirst({
            where: {
                Name: data.Name
            }
        });
        if (find_unique_name != undefined || find_unique_name != null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the same name when create new village!", false);
        }
        try {
            const data_create = await this.prisma.village.create({
                data: {
                    Name: data.Name,
                    Address: data.Address,
                    Total_Population: Number(data.Total_Population),
                    Village_Age: Number(data.Village_Age),
                    Leader_VillageId: Number(data.Leader_VillageId)
                }
            });
            if (!data_create == undefined || data_create == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create the data because the data is null or undefined!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(data_create, common_1.HttpStatus.CREATED, "Successfully to create new village data!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new vilage as a leader of village!", false);
        }
    }
    async deleteVillage(id, user_id) {
        if (!id == undefined && user_id == undefined || id == null && user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to delete the village using id and user_id!", false);
        }
        try {
            const delete_data = await this.prisma.village.delete({
                where: {
                    id: Number(id)
                }
            });
            if (!delete_data == undefined || delete_data == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to delete data because the data that you want to delete is null!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(true, common_1.HttpStatus.OK, "Successfully to delete the data!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to delete the data village!", false);
        }
    }
    async updateVillage(data, user_id, id) {
        if (!id == undefined && user_id == undefined || id == null && user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to update the village using id and user_id!", false);
        }
        const update_data = (0, null_check_helper_js_1.CheckIsNull)(data);
        try {
            const update = await this.prisma.village.update({
                where: {
                    id: Number(id)
                },
                data: update_data
            });
            if (!update == undefined || update == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to update because the result is nill!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(null, common_1.HttpStatus.OK, "Success to update the village data!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to update the data!", false);
        }
    }
    async getAllVillage(user_id) {
        if (!user_id == undefined || user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user id from token jwt!", false);
        }
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
            if (getAll_village == undefined || getAll_village == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Not Found!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(getAll_village, common_1.HttpStatus.OK, "Successfully to get all data of village!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get all data of village!", false);
        }
    }
};
exports.VillageService = VillageService;
exports.VillageService = VillageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], VillageService);
//# sourceMappingURL=village.service.js.map