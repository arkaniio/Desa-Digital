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
let IdentityService = class IdentityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerIdentity(data, user_id) {
        const identity_data = await this.prisma.identity.findUnique({
            where: {
                Full_Name: data.Full_Name
            }
        });
        if (identity_data)
            throw new common_1.BadRequestException("the name has been already exists!");
        if (!user_id)
            throw new common_1.UnauthorizedException("Failed to get the user id!");
        try {
            const data_identity = await this.prisma.identity.create({
                data: {
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    Age: data.Age,
                    Adress: data.Adress,
                }
            });
            if (!data_identity)
                throw new common_1.BadRequestException("Failed to create the new identity!");
            return {
                data: {
                    id: data_identity.id,
                    user_id: data_identity,
                    full_name: data_identity.Full_Name,
                    age: data_identity.Age,
                    adress: data_identity.Adress
                }
            };
        }
        catch (error) {
            if (error.code == "P2005")
                throw new common_1.BadRequestException("Failed to register as a identity");
        }
    }
    async deleteIdentity(id) {
        return this.prisma.identity.delete({
            where: {
                id: id
            }
        });
    }
    async updateIdentity(data, id) {
        if (!id)
            throw new common_1.BadRequestException("id must be required!");
        const update_data = {};
        if (data.Full_Name)
            update_data.Full_Name = data.Full_Name;
        if (data.Age)
            update_data.Age = data.Age;
        if (data.Adress)
            update_data.Adress = data.Adress;
        try {
            const update_identity = await this.prisma.identity.update({
                where: {
                    id: id
                },
                data: update_data
            });
            if (!update_identity)
                throw new common_1.BadRequestException("Failed to update identity!");
            return {
                data: {
                    status: true,
                    message: "Success to update the identity!"
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map