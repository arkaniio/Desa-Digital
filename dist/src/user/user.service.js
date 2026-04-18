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
const response_status_1 = require("../utils/response_status");
const validator_1 = require("validator");
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
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Email has been already exists!", false);
        const password_hash = await bcrypt.hash(data.Password, 10);
        if (!password_hash)
            throw Error("Failed to hash the password!");
        try {
            const user = await this.prisma.user.create({
                data: {
                    Username: data.Username,
                    Email: data.Email,
                    Password: password_hash,
                    Role: data.Role
                }
            });
            return (0, response_status_1.ResponseSuccess)(user, common_1.HttpStatus.OK, "Successfully to create new user!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new user!", false);
        }
    }
    async loginUser(data) {
        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        });
        if (user_data == undefined || user_data == null)
            return (0, response_status_1.ResponseError)(validator_1.normalizeEmail, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user data using email user!", false);
        const isPasswordValid = await bcrypt.compare(data.Password, user_data?.Password);
        if (!isPasswordValid)
            throw Error("Invalid password!");
        const token = this.jwtService.sign({
            id: user_data.id,
            email: user_data.Email,
            role: user_data.Role,
            username: user_data.Username
        });
        return (0, response_status_1.ResponseSuccess)(token, common_1.HttpStatus.OK, "Success to login as a user!", true);
    }
    async getProfile(user_id) {
        if (user_id == undefined || user_id == null)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the id number!", false);
        try {
            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: Number(user_id)
                }
            });
            if (data_user == undefined || data_user == null)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user data!", false);
            return (0, response_status_1.ResponseSuccess)(data_user, common_1.HttpStatus.OK, "Success to get the profile!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to get the profile!", false);
        }
    }
    async updateProfile(user_id, data) {
        if (!user_id)
            return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user id!", false);
        const update_data = {};
        if (update_data.Username)
            update_data.Username = data.Username;
        if (update_data.Email)
            update_data.Email = data.Email;
        if (update_data.Password) {
            const password_hash = await bcrypt.hash(data.Password, 10);
            if (!password_hash)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to hashing the password!", false);
            update_data.Password = password_hash;
        }
        try {
            const update_users = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: update_data
            });
            if (!update_users)
                return (0, response_status_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to update the users!", false);
            return (0, response_status_1.ResponseSuccess)(update_users, common_1.HttpStatus.OK, "Success to get the user profile!", true);
        }
        catch (error) {
            return (0, response_status_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to update the users data!", false);
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