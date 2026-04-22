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
const response_status_1 = require("../utils/response_status");
let RwService = class RwService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerRw(data, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to detect the user id!", false);
        }
        if (data == undefined || data == null) {
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to detect the data from rw data!", false);
        }
        try {
            const data_create = await this.prisma.rw.create({
                data: {
                    Name: data.Name
                }
            });
            if (data_create == undefined || data_create == null) {
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create new data!", false);
            }
            return (0, response_status_1.ResponseSuccess)(data_create, common_1.HttpStatus.CREATED, "Successfully to register data!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new data of rw!", false);
        }
    }
};
exports.RwService = RwService;
exports.RwService = RwService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RwService);
//# sourceMappingURL=rw.service.js.map