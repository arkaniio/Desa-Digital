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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const token_service_1 = __importDefault(require("../common/services/token/token.service"));
const password_service_1 = __importDefault(require("../common/services/password/password.service"));
let AuthService = class AuthService {
    prisma;
    tokenService;
    passwordService;
    constructor(prisma, tokenService, passwordService) {
        this.prisma = prisma;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
    }
    async findUserByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    Email: email
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findUserById(user_id) {
        try {
            return await this.prisma.user.findFirst({
                where: {
                    id: user_id
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async generateAuth(data) {
        try {
            if (data.Password) {
                const hashPassword = await this.passwordService.hashPassword(data.Password);
                data.Password = hashPassword;
                return await this.prisma.user.create({
                    data: data
                });
            }
            return await this.prisma.user.create({
                data: data
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async validateOrCreate(profile) {
        const email = profile.emails[0].value;
        let user = await this.findUserByEmail(email);
        if (!user) {
            user = await this.generateAuth({
                Username: profile.displayName,
                Email: email,
                Password: null,
                Avatar: profile.photos?.[0]?.value,
            });
        }
        return await this.tokenService.generateToken({
            userId: user.id,
            email: user.Email,
            role: user.Role,
            username: user.Username
        });
    }
    async registerUser(data) {
        const user_data = await this.findUserByEmail(data.Email);
        if (user_data)
            throw new common_1.BadRequestException("Email has been already exists!");
        try {
            const user = await this.generateAuth(data);
            if (!user)
                throw new common_1.BadRequestException("Failed to create user, something went wrong!");
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async loginUser(data) {
        const user_data = await this.findUserByEmail(data.Email);
        if (!user_data)
            throw new common_1.NotFoundException("Email not found!");
        const comparePassword = await this.passwordService.comparePassword(user_data.Password, data.Password);
        if (!comparePassword)
            throw new common_1.BadRequestException("Failed to compare new password!");
        try {
            const token = await this.tokenService.generateToken({
                userId: user_data.id,
                email: user_data.Email,
                role: user_data.Role,
                username: user_data.Username
            });
            return token;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async changePassword(data, user_id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("User id in authorization must be required!");
        try {
            const hashPassword = await this.passwordService.hashPassword(data.Password);
            data.Password = hashPassword;
            const updatePassword = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    Password: hashPassword
                }
            });
            console.log(updatePassword, data.Password);
            if (!updatePassword)
                throw new common_1.BadRequestException("Failed to update password!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        token_service_1.default,
        password_service_1.default])
], AuthService);
//# sourceMappingURL=auth.service.js.map