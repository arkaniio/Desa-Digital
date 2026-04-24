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
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const role_guard_1 = require("../user/rolesGuard/role.guard");
const role_decorator_1 = require("../user/decorators/role_decorator");
const auth_token_decorator_1 = require("../user/decorators/auth_token.decorator");
let AnnouncementController = class AnnouncementController {
    announcementService;
    constructor(announcementService) {
        this.announcementService = announcementService;
    }
    async createNewAnnouncement(data, user_id) {
        console.log(data);
        console.log(user_id);
        return this.announcementService.createNewAnnouncement(data, user_id);
    }
};
exports.AnnouncementController = AnnouncementController;
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)("RT"),
    (0, role_decorator_1.Roles)("RW"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_token_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService, Number]),
    __metadata("design:returntype", Promise)
], AnnouncementController.prototype, "createNewAnnouncement", null);
exports.AnnouncementController = AnnouncementController = __decorate([
    (0, common_1.Controller)('announcement'),
    __metadata("design:paramtypes", [announcement_service_1.AnnouncementService])
], AnnouncementController);
//# sourceMappingURL=announcement.controller.js.map