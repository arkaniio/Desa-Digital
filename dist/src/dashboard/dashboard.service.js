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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getDashboardData(user_id, role) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the dashboard from authorization!");
        switch (role) {
            case "SUPER_ADMIN":
                return this.superAdminDashboard(user_id);
            case "KEPALA_DESA":
                return this.kepalaDesaDashboard(user_id);
            case "RW":
                return this.rwDashboard(user_id);
            case "RT":
                return this.rtDashboard(user_id);
            case "WARGA":
                return this.wargaDashboard(user_id);
        }
    }
    async wargaDashboard(user_id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the user id from token authorization!");
        try {
            const total_submissions_pending = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "PENDING"
                }
            });
            const total_submissions_diajukan = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "DIAJUKAN"
                }
            });
            const total_submissions_approved_kepala = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "APPROVED_KEPALA_DESA"
                }
            });
            const total_submissons_approved_rt = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "APPROVED_RT"
                }
            });
            const latest_announcement_data = await this.prismaService.announcement.count({
                take: 5,
                orderBy: {
                    Dibuat_pada: "desc"
                }
            });
            return {
                total_submissions_pending: total_submissions_pending,
                total_submissions_diajukan: total_submissions_diajukan,
                total_submissions_approved_rt: total_submissons_approved_rt,
                total_submissions_approved_kepala: total_submissions_approved_kepala,
                latest_submissions_announcement: latest_announcement_data
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async superAdminDashboard(user_id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the user id from authorization!");
        try {
            const data_warga = await this.prismaService.user.count();
            const data_kepala_desa = await this.prismaService.user.count({
                where: {
                    Role: "KEPALA_DESA"
                }
            });
            const data_rt = await this.prismaService.rt.count();
            const data_rw = await this.prismaService.rw.count();
            return {
                total_warga: data_warga,
                total_kepala: data_kepala_desa,
                total_rt: data_rt,
                total_rw: data_rw,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async rtDashboard(user_id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the user id from authorization!");
        try {
            const findLeader = await this.prismaService.rt.findFirst({
                where: {
                    Leader_Id: user_id
                }
            });
            const total_warga_rt = await this.prismaService.user.count({
                where: {
                    RtId: findLeader?.Id,
                    Role: "WARGA"
                }
            });
            const total_announcement_rt = await this.prismaService.announcement.count({
                where: {
                    RtId: findLeader?.Id,
                }
            });
            return {
                total_warga: total_warga_rt,
                total_announcement: total_announcement_rt
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async rwDashboard(user_id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the user id from authorization!");
        try {
            const findLeader = await this.prismaService.rw.findFirst({
                where: {
                    Leader_Id: user_id
                }
            });
            const total_warga_rw = await this.prismaService.user.count({
                where: {
                    RwId: findLeader?.Id,
                    Role: "WARGA"
                }
            });
            const total_announcement_rw = await this.prismaService.announcement.count({
                where: {
                    RwId: findLeader?.Id
                }
            });
            return {
                total_warga: total_warga_rw,
                total_announcement: total_announcement_rw
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async kepalaDesaDashboard(user_id) {
        if (user_id == undefined)
            throw new common_1.UnauthorizedException("Failed to get the user id from authorization!");
        try {
            const findLeader = await this.prismaService.village.findFirst({
                where: {
                    Leader_VillageId: user_id
                }
            });
            const total_submissions_approvedKepala = await this.prismaService.submissions.count({
                where: {
                    Status: "APPROVED_KEPALA_DESA"
                }
            });
            const submissions_all = await this.prismaService.submissions.findMany({
                where: {
                    Status: "APPROVED_KEPALA_DESA"
                }
            });
            const total_submissions_lates = await this.prismaService.submissions.count({
                take: 5,
                orderBy: {
                    Tanggal_pengajuan: "desc"
                }
            });
            const total_warga_desa = await this.prismaService.user.count({
                where: {
                    VillageId: findLeader?.Leader_VillageId
                }
            });
            return {
                total_submissions_approved_kepala: total_submissions_approvedKepala,
                submissions_data: submissions_all,
                total_submissions_lates: total_submissions_lates,
                total_warga: total_warga_desa
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
exports.default = DashboardService;
//# sourceMappingURL=dashboard.service.js.map