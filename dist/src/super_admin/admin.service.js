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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const password_service_1 = __importDefault(require("../common/services/password/password.service"));
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    passwordService;
    prismaService;
    constructor(passwordService, prismaService) {
        this.passwordService = passwordService;
        this.prismaService = prismaService;
    }
    async createKepalaDesaAccount(data) {
        try {
            const hashPassword = await this.passwordService.hashPassword(data.Password);
            data.Password = hashPassword;
            data.Role = "KEPALA_DESA";
            const user = await this.prismaService.user.create({
                data: data
            });
            if (!user)
                throw new common_1.BadRequestException("Failed to create the user account for kepala desa!");
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createRwAccount(data) {
        try {
            const hashPassword = await this.passwordService.hashPassword(data.Password);
            data.Password = hashPassword;
            data.Role = "RW";
            const user = await this.prismaService.user.create({
                data: data
            });
            if (!user)
                throw new common_1.BadRequestException("Failed to create the user account for kepala desa!");
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createRtAccount(data) {
        try {
            const hashPassword = await this.passwordService.hashPassword(data.Password);
            data.Password = hashPassword;
            data.Role = "RT";
            const user = await this.prismaService.user.create({
                data: data
            });
            if (!user)
                throw new common_1.BadRequestException("Failed to create the user account for kepala desa!");
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [password_service_1.default,
        prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map