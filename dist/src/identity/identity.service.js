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
const prisma_service_1 = require("../prisma/prisma.service");
const response_status_1 = require("../utils/response_status");
let IdentityService = class IdentityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerIdentity(data, user_id) {
        if (user_id == undefined || user_id == null)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to get the user id!", false);
        const identity_data = await this.prisma.identity.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        });
        if (identity_data != undefined || identity_data != null)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Name has been already exists!", false);
        try {
            const data_identity = await this.prisma.identity.create({
                data: {
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    Rt: data.Rt,
                    Age: data.Age,
                    Address: data.Address
                }
            });
            if (data_identity == undefined || data_identity == null)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create new identity!", false);
            return (0, response_status_1.ResponseSuccess)(data_identity, common_1.HttpStatus.OK, "Successfully to create the new identity!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new data identity!", false);
        }
    }
    async deleteIdentity(id) {
        if (id == undefined || id == null)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to detect the id identity!", false);
        try {
            const data = await this.prisma.identity.findUnique({
                where: {
                    id: id
                }
            });
            if (data == undefined || data == null)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data identity!", false);
            return (0, response_status_1.ResponseSuccess)(data, common_1.HttpStatus.OK, "Successfully to get the data!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data identity!", false);
        }
    }
    async getIdentity(id) {
        if (id == undefined || id == null)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to detect the id!", false);
        try {
            const find_identity = await this.prisma.identity.findUnique({
                where: {
                    id: id
                },
                include: {
                    User: true
                }
            });
            if (find_identity == undefined || find_identity == null)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the find identity!", false);
            return (0, response_status_1.ResponseSuccess)(find_identity, common_1.HttpStatus.OK, "Successfully to get the identity!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the identity!", false);
        }
    }
    async updateIdentity(data, user_id) {
        if (user_id == undefined || user_id == null)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.UNAUTHORIZED, "Failed to detect the user id!", false);
        const update_data = {};
        if (data.Full_Name != undefined || data.Full_Name != null)
            update_data.Full_Name = data.Full_Name;
        if (data.Rt != undefined || data.Rt != null) {
            const parsingIntoInt = parseInt(data.Rt);
            if (typeof parsingIntoInt != "number")
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Invalid type of Rt!", false);
            update_data.Rt = parsingIntoInt;
        }
        if (data.Age) {
            const parsingIntoInt = parseInt(data.Age);
            if (typeof parsingIntoInt != "number")
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Invalid type of age!", false);
            update_data.Age = parsingIntoInt;
        }
        if (data.Address)
            update_data.Adress = data.Address;
        try {
            const update_identity = await this.prisma.identity.update({
                where: {
                    id: user_id
                },
                data: update_data
            });
            if (update_identity == undefined || update_identity == null)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to update the identity data!", false);
            return (0, response_status_1.ResponseSuccess)(update_identity, common_1.HttpStatus.OK, "Successfully to update the identity data!", false);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to update data!", false);
        }
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map