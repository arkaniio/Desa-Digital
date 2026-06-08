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
exports.AnnouncementController = void 0;
const common_1 = require("@nestjs/common");
const announcement_service_1 = require("./announcement.service");
const jwt_auth_guard_1 = require("../common/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/auth/guards/roles.guard");
const roles_decorator_1 = require("../common/auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/auth/decorators/current-user.decorator");
const announcement_dto_1 = require("./dto/announcement.dto");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const file_helper_1 = require("../common/files_tools/file_helper");
let AnnouncementController = class AnnouncementController {
    announcementService;
    constructor(announcementService) {
        this.announcementService = announcementService;
    }
    async createNewAnnouncement(data, user_id, file) {
        return this.announcementService.createNewAnnouncement(data, user_id, file);
    }
    async updateAnnouncement(data, id, user_id, file) {
        return this.announcementService.updateAnnouncement(user_id, id, data, file);
    }
    async getAllAnnouncement(user_id, query, authorId) {
        return this.announcementService.getAllAnnouncement(user_id, query, authorId);
    }
    async deleteAnnouncement(id, user_id) {
        return this.announcementService.deleteAnnouncement(user_id, id);
    }
};
exports.AnnouncementController = AnnouncementController;
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("KEPALA_DESA"),
    (0, common_1.UseInterceptors)(file_helper_1.FileInterceptorTools),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('user_id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [announcement_dto_1.AnnouncementDto, Number, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "createNewAnnouncement", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("KEPALA_DESA"),
    (0, common_1.UseInterceptors)(file_helper_1.FileInterceptorTools),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "updateAnnouncement", null);
__decorate([
    (0, common_1.Get)("all"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("WARGA"),
    __param(0, (0, current_user_decorator_1.CurrentUser)('user_id')),
    __param(1, (0, common_1.Query)('query')),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_query_dto_1.PaginationDto, Number]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "getAllAnnouncement", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("KEPALA_DESA"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "deleteAnnouncement", null);
exports.AnnouncementController = AnnouncementController = __decorate([
    (0, common_1.Controller)('announcement'),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService])
], AnnouncementController);
//# sourceMappingURL=announcement.controller.js.map