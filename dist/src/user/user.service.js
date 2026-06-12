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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
const user_select_1 = require("./constants/user_select");
const password_service_1 = __importDefault(require("../common/services/password/password.service"));
let UserService = class UserService {
    prisma;
    passwordService;
    constructor(prisma, passwordService) {
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    async getProfile(user_id) {
        try {
            const data_user = await this.prisma.user.findFirst({
                where: {
                    id: user_id
                },
                select: user_select_1.SELECT_USER_DATA
            });
            if (!data_user)
                throw new common_1.BadRequestException("Failed to get the data user!");
            return data_user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateProfile(file_path, user_id, data) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        try {
            const update_data = await (0, null_check_helper_1.CheckIsNullWitMulterAvatar)(data, file_path, "Avatar");
            if (!update_data || Object.keys(update_data).length === 0)
                throw new common_1.BadRequestException("Failed to get the payload of the request!");
            if (update_data.Password) {
                const hashPassword = await this.passwordService.hashPassword(update_data.Password);
                if (!hashPassword)
                    throw new common_1.BadRequestException("Failed to hashing password!");
                update_data.Password = hashPassword;
            }
            const update_users = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: update_data
            });
            if (!update_users)
                throw new common_1.BadRequestException("Failed to update the users data!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_service_1.default])
], UserService);
//# sourceMappingURL=user.service.js.map