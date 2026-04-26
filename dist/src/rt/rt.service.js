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
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const null_check_helper_js_1 = require("../common/helpers/null-check.helper.js");
const response_helper_js_1 = require("../common/helpers/response.helper.js");
let RtService = class RtService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerRt(data, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to get the user id!", false);
        }
        if (data == undefined || data == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to initiate the data must be required!", false);
        }
        try {
            const data_create = await this.prisma.rt.create({
                data: {
                    RwId: data.RwId,
                    Number: data.Number
                }
            });
            if (data_create == undefined || data_create == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create data because the value is null!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(data, common_1.HttpStatus.CREATED, "Successfully to create new rt!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new data rt!", false);
        }
    }
    async updateRt(data, user_id, id) {
        if (!user_id && id == undefined || !user_id && id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to detect the user id or id!", false);
        }
        const update_data = (0, null_check_helper_js_1.CheckIsNullWithNumber)(data);
        try {
            const update = await this.prisma.rt.update({
                where: {
                    Id: Number(id)
                },
                data: update_data
            });
            if (!update || update == undefined) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to update the data because the value is undefined!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(true, common_1.HttpStatus.OK, "Successfully to update the data of rt!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to update the data Rt!", false);
        }
    }
    async deleteRt(user_id, id) {
        if (!user_id && id == undefined || !user_id && id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user_id and id from the request!", false);
        }
        try {
            const delete_data = await this.prisma.rt.delete({
                where: {
                    Id: Number(id)
                }
            });
            if (!delete_data && delete_data == undefined || delete_data == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to delete data because the data that you want to delete it is nill or undefined!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(true, common_1.HttpStatus.OK, "Successfully to delete the data rw!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to delete the rt data!", false);
        }
    }
};
exports.RtService = RtService;
exports.RtService = RtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], RtService);
//# sourceMappingURL=rt.service.js.map