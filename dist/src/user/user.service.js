"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
let UserService = class UserService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerUser(data) {
        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        });
        if (user_data)
            throw new common_1.BadRequestException("Email has been already exists!");
        const password_hash = await bcrypt.hash(data.Password, 10);
        if (!password_hash == undefined || password_hash == null)
            throw new common_1.BadRequestException("Failed to hashing password!");
        try {
            const user = await this.prisma.user.create({
                data: {
                    Username: data.Username,
                    Email: data.Email,
                    Password: password_hash,
                    Role: data.Role
                }
            });
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async loginUser(data) {
        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        });
        if (user_data == undefined || user_data == null)
            throw new common_1.BadRequestException("Failed to get the data!");
        const isPasswordValid = await bcrypt.compare(data.Password, user_data?.Password);
        if (isPasswordValid == undefined || !isPasswordValid)
            throw new common_1.BadRequestException("Failed to compare the password!");
        const token = this.jwtService.sign({
            id: user_data.id,
            email: user_data.Email,
            role: user_data.Role,
            username: user_data.Username
        });
        return token;
    }
    async getProfile(user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        try {
            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: Number(user_id)
                },
                include: {
                    identities: {
                        select: {
                            Full_Name: true,
                            Rt: true,
                            Age: true,
                            Address: true
                        }
                    },
                    villages: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    }
                }
            });
            if (!data_user && data_user == undefined || data_user == null)
                throw new common_1.BadRequestException("Failed to get the data user!");
            return data_user;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateProfile(file_path, user_id, data) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token!");
        const update_data = await (0, null_check_helper_1.CheckIsNullWitMulter)(data, file_path);
        console.log(update_data);
        if (!update_data && update_data == undefined || update_data == null)
            throw new common_1.BadRequestException("Failed to get the payload of the request!");
        try {
            const update_users = await this.prisma.user.update({
                where: {
                    id: Number(user_id)
                },
                data: update_data
            });
            if (!update_users && update_users == undefined || update_users == null)
                throw new common_1.BadRequestException("Failed to get the data update!");
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
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map