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
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
const jwt_auth_guard_1 = require("../common/auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/auth/decorators/current-user.decorator");
const roles_guard_1 = require("../common/auth/guards/roles.guard");
const roles_decorator_1 = require("../common/auth/decorators/roles.decorator");
const create_identity_dto_1 = require("./dto/create-identity.dto");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
let IdentityController = class IdentityController {
    identityService;
    constructor(identityService) {
        this.identityService = identityService;
    }
    async getAllIdentity(query) {
        return this.identityService.getAllIdentity(query);
    }
    async registerIdentity(data, user_id) {
        return this.identityService.registerIdentity(data, user_id);
    }
    async deleteIdentity(id) {
        return this.identityService.deleteIdentity(id);
    }
    async updateIdentity(data, user_id, identity_id) {
        return this.identityService.updateIdentity(data, identity_id, user_id);
    }
    async getIdentity(id) {
        return this.identityService.getIdentity(id);
    }
};
exports.IdentityController = IdentityController;
__decorate([
    (0, common_1.Get)("full"),
    (0, roles_decorator_1.Roles)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "getAllIdentity", null);
__decorate([
    (0, common_1.Post)("registerIdentity"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_identity_dto_1.CreateIdentityDto, Number]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "registerIdentity", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "deleteIdentity", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "updateIdentity", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "getIdentity", null);
exports.IdentityController = IdentityController = __decorate([
    (0, common_1.Controller)('identity'),
    __metadata("design:paramtypes", [identity_service_1.IdentityService])
], IdentityController);
//# sourceMappingURL=identity.controller.js.map