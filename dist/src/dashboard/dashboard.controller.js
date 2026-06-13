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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = __importDefault(require("./dashboard.service"));
const auth_1 = require("../common/auth");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardData(userId, role) {
        return this.dashboardService.getDashboardData(userId, role);
    }
    async superAdminDashboard(userId) {
        return this.dashboardService.superAdminDashboard(userId);
    }
    async wargaDashboard(userId) {
        return this.dashboardService.wargaDashboard(userId);
    }
    async kepalaDesaDashboard(userId) {
        return this.dashboardService.kepalaDesaDashboard(userId);
    }
    async rtDashboard(userId) {
        return this.dashboardService.rtDashboard(userId);
    }
    async rwDashboard(userId) {
        return this.dashboardService.rwDashboard(userId);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, auth_1.CurrentUser)('userId')),
    __param(1, (0, auth_1.CurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardData", null);
__decorate([
    (0, common_1.Get)("super_admin"),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, auth_1.CurrentUser)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "superAdminDashboard", null);
__decorate([
    (0, common_1.Get)("warga"),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, auth_1.CurrentUser)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "wargaDashboard", null);
__decorate([
    (0, common_1.Get)("kepala_desa"),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, auth_1.CurrentUser)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "kepalaDesaDashboard", null);
__decorate([
    (0, common_1.Get)("rt"),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, auth_1.CurrentUser)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "rtDashboard", null);
__decorate([
    (0, common_1.Get)("rw"),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard),
    __param(0, (0, auth_1.CurrentUser)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "rwDashboard", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)("dashboard"),
    __metadata("design:paramtypes", [dashboard_service_1.default])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map