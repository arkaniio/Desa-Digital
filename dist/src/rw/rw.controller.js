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
exports.RwController = void 0;
const common_1 = require("@nestjs/common");
const rw_service_1 = require("./rw.service");
const role_decorator_1 = require("../user/decorators/role_decorator");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const role_guard_1 = require("../user/rolesGuard/role.guard");
const rw_dto_1 = require("../validator/rw_dto");
const auth_token_decorator_1 = require("../user/decorators/auth_token.decorator");
let RwController = class RwController {
    rwService;
    constructor(rwService) {
        this.rwService = rwService;
    }
    async regsiterRw(data, user_id) {
        return this.rwService.registerRw(data, user_id);
    }
    async updateRw(data, user_id, id) {
        return this.rwService.updateRw(data, user_id, id);
    }
    async deleteRw(user_id, id) {
        return this.rwService.deleteRw(user_id, id);
    }
};
exports.RwController = RwController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_token_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rw_dto_1.RwDto, Number]),
    __metadata("design:returntype", Promise)
], RwController.prototype, "regsiterRw", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_token_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], RwController.prototype, "updateRw", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("ADMIN"),
    __param(0, (0, auth_token_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RwController.prototype, "deleteRw", null);
exports.RwController = RwController = __decorate([
    (0, common_1.Controller)('rw'),
    __metadata("design:paramtypes", [rw_service_1.RwService])
], RwController);
//# sourceMappingURL=rw.controller.js.map