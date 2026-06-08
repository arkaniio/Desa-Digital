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
exports.SubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const submissions_service_1 = require("./submissions.service");
const current_user_decorator_1 = require("../common/auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/auth/decorators/roles.decorator");
const roles_guard_1 = require("../common/auth/guards/roles.guard");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const submissions_dto_1 = require("./dto/submissions.dto");
const file_helper_1 = require("../common/files_tools/file_helper");
let SubmissionsController = class SubmissionsController {
    submissionsService;
    constructor(submissionsService) {
        this.submissionsService = submissionsService;
    }
    async getAllSubmissions(user_id, query) {
        return this.submissionsService.getAllSubmissions(user_id, query);
    }
    async createSubmissions(data, user_id, file) {
        return this.submissionsService.createSubmissions(data, user_id, file);
    }
    async updateSubmissions(data, id, user_id, file) {
        return this.submissionsService.updateSubmissions(data, id, user_id, file);
    }
    async deleteSubmissions(id, user_id) {
        return this.submissionsService.deleteSubmissions(user_id, id);
    }
    async updateSubmissionsWithRt(data, id, user_id) {
        return this.submissionsService.updateSubmissionsWithRt(user_id, data, id);
    }
    async updateSubmissionsWithKepalaDesa(data, id, user_id) {
        return this.submissionsService.updateSubmissionsWithKepalaDesa(user_id, data, id);
    }
    async verifySubmission(signature) {
        return this.submissionsService.verifySubmission(signature);
    }
};
exports.SubmissionsController = SubmissionsController;
__decorate([
    (0, common_1.Get)("all"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("WARGA"),
    __param(0, (0, current_user_decorator_1.CurrentUser)('user_id')),
    __param(1, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_query_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getAllSubmissions", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("WARGA"),
    (0, common_1.UseInterceptors)(file_helper_1.FileInterceptorTools),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('user_id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submissions_dto_1.CreateSubmissionDto, Number, Object]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "createSubmissions", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("WARGA"),
    (0, common_1.UseInterceptors)(file_helper_1.FileInterceptorTools),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)('user_id')),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submissions_dto_1.UpdateSubmissionsDto, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "updateSubmissions", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("WARGA"),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "deleteSubmissions", null);
__decorate([
    (0, common_1.Put)("permissions_rt/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("RT"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submissions_dto_1.UpdateRtSignSubmissions, Number, Number]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "updateSubmissionsWithRt", null);
__decorate([
    (0, common_1.Put)("permissions_kepdes/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("KEPALA_DESA"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submissions_dto_1.UpdateKepalaDesaSignSubmissions, Number, Number]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "updateSubmissionsWithKepalaDesa", null);
__decorate([
    (0, common_1.Get)("verify_submissions"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "verifySubmission", null);
exports.SubmissionsController = SubmissionsController = __decorate([
    (0, common_1.Controller)('submissions'),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService])
], SubmissionsController);
//# sourceMappingURL=submissions.controller.js.map