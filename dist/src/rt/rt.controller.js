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
exports.RtController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../common/auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/auth/guards/roles.guard");
const create_rt_dto_1 = require("./dto/create-rt.dto");
const rt_service_1 = require("./rt.service");
let RtController = class RtController {
    RtService;
    constructor(RtService) {
        this.RtService = RtService;
    }
    async registerRt(data, user_id) {
        return this.RtService.registerRt(data, user_id);
    }
    async updateRt(data, user_id, id) {
        return this.RtService.updateRt(data, user_id, id);
    }
    async deleteRt(id, user_id) {
        return this.RtService.deleteRt(user_id, id);
    }
};
exports.RtController = RtController;
__decorate([
    (0, common_1.Post)('register'),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rt_dto_1.CreateRtDto, Number]),
    __metadata("design:returntype", Promise)
], RtController.prototype, "registerRt", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], RtController.prototype, "updateRt", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RtController.prototype, "deleteRt", null);
exports.RtController = RtController = __decorate([
    (0, common_1.Controller)('rt'),
    __metadata("design:paramtypes", [rt_service_1.RtService])
], RtController);
//# sourceMappingURL=rt.controller.js.map