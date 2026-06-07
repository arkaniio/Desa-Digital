import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
class DashboardService {

    constructor(private readonly prismaService: PrismaService) { }

    async getDashboardData(user_id: number, role: string) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the dashboard from authorization!")

        switch (role) {

            case "SUPER_ADMIN":
                return this.superAdminDashboard(user_id)
            case "KEPALA_DESA":
                return this.kepalaDesaDashboard(user_id)
            case "RW":
                return this.rwDashboard(user_id)
            case "RT":
                return this.rtDashboard(user_id)

        }

    }


    async superAdminDashboard(user_id: number) { }

    async rtDashboard(user_id: number) { }

    async rwDashboard(user_id: number) { }

    async kepalaDesaDashboard(user_id: number) { }
}