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
exports.VillageController = void 0;
const common_1 = require("@nestjs/common");
const village_service_js_1 = require("./village.service.js");
const jwt_auth_guard_js_1 = require("../common/auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../common/auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../common/auth/decorators/roles.decorator.js");
const create_village_dto_js_1 = require("./dto/create-village.dto.js");
const current_user_decorator_js_1 = require("../common/auth/decorators/current-user.decorator.js");
let VillageController = class VillageController {
    villageService;
    constructor(villageService) {
        this.villageService = villageService;
    }
    async createNewVillage(data, user_id) {
        return this.villageService.createNewVillage(data, user_id);
    }
    async deleteVillage(id, user_id) {
        return this.villageService.deleteVillage(id, user_id);
    }
    async updateVillage(data, id, user_id) {
        return this.villageService.updateVillage(data, user_id, id);
    }
    async getAllVillage(user_id) {
        return this.villageService.getAllVillage(user_id);
    }
};
exports.VillageController = VillageController;
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_village_dto_js_1.CreateVillageDto, Number]),
    __metadata("design:returntype", Promise)
], VillageController.prototype, "createNewVillage", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], VillageController.prototype, "deleteVillage", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)("ADMIN"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], VillageController.prototype, "updateVillage", null);
__decorate([
    (0, common_1.Get)("allVillage"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VillageController.prototype, "getAllVillage", null);
exports.VillageController = VillageController = __decorate([
    (0, common_1.Controller)('village'),
    __metadata("design:paramtypes", [village_service_js_1.VillageService])
], VillageController);
//# sourceMappingURL=village.controller.js.map