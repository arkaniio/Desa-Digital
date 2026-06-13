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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_1 = require("./dto/auth");
const common_2 = require("@nestjs/common");
const auth_2 = require("../common/auth");
const google_auth_guard_1 = require("../common/auth/guards/google-auth.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(data) {
        return this.authService.registerUser(data);
    }
    async loginUser(data) {
        return this.authService.loginUser(data);
    }
    async changePassword(data, userId) {
        return this.authService.changePassword(data, userId);
    }
    async googleAuth(req) { }
    async googleCallbackAuth(req) {
        return {
            data: req.user
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Put)('updatePassword'),
    (0, common_1.UseGuards)(auth_2.JwtAuthGuard),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, auth_2.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)("google"),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)("google/callback"),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallbackAuth", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map