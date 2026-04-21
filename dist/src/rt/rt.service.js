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
const response_status_1 = require("../utils/response_status");
let RtService = class RtService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerRt(data, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to get the user id!", false);
        }
        if (data == undefined || data == null) {
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to initiate the data must be required!", false);
        }
        try {
            const data_create = await this.prisma.rt.create({
                data: {
                    RwId: data.RwId,
                    Number: data.Number
                }
            });
            if (data_create == undefined || data_create == null) {
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create data because the value is null!", false);
            }
            return (0, response_status_1.ResponseSuccess)(data, common_1.HttpStatus.OK, "Successfully to create new rt!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new data rt!", false);
        }
    }
};
exports.RtService = RtService;
exports.RtService = RtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RtService);
//# sourceMappingURL=rt.service.js.map