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

}