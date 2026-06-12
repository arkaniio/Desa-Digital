import { Controller, Get, UseGuards } from "@nestjs/common";
import DashboardService from "./dashboard.service";
import { CurrentUser, JwtAuthGuard } from "../common/auth";

@Controller("dashboard")
export class DashboardController {

    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getDashboardData(
        @CurrentUser('userId') userId: number,
        @CurrentUser('role') role: string
    ) {
        return this.dashboardService.getDashboardData(userId, role)
    }

    @Get("super_admin")
    @UseGuards(JwtAuthGuard)
    async superAdminDashboard(
        @CurrentUser("userId") userId: number
    ) {
        return this.dashboardService.superAdminDashboard(userId)
    }

    @Get("warga")
    @UseGuards(JwtAuthGuard)
    async wargaDashboard(
        @CurrentUser("userId") userId: number
    ) {
        return this.dashboardService.wargaDashboard(userId)
    }

    @Get("kepala_desa")
    @UseGuards(JwtAuthGuard)
    async kepalaDesaDashboard(
        @CurrentUser("userId") userId: number
    ) {
        return this.dashboardService.kepalaDesaDashboard(userId)
    }


    @Get("rt")
    @UseGuards(JwtAuthGuard)
    async rtDashboard(
        @CurrentUser("userId") userId: number
    ) {
        return this.dashboardService.rtDashboard(userId)
    }

    @Get("rw")
    @UseGuards(JwtAuthGuard)
    async rwDashboard(
        @CurrentUser("userId") userId: number
    ) {
        return this.dashboardService.rwDashboard(userId)
    }

}