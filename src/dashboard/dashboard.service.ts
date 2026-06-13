import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
class DashboardService {

    constructor(private readonly prismaService: PrismaService) { }

    async getDashboardData(user_id: number, role: string) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the dashboard from authorization!")

        switch (role) {

            case "SUPER_ADMIN":
                return this.superAdminDashboard(user_id)
            case "KEPALA_DESA":
                return this.kepalaDesaDashboard(user_id)
            case "RW":
                return this.rwDashboard(user_id)
            case "RT":
                return this.rtDashboard(user_id)
            case "WARGA":
                return this.wargaDashboard(user_id)

        }

    }

    async wargaDashboard(user_id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the user id from token authorization!")

        try {

            // submissions page
            const total_submissions_pending = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "PENDING"
                }
            })

            const total_submissions_diajukan = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "DIAJUKAN"
                }
            })

            const total_submissions_approved_kepala = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "APPROVED_KEPALA_DESA"
                }
            })

            const total_submissons_approved_rt = await this.prismaService.submissions.count({
                where: {
                    SenderId: user_id,
                    Status: "APPROVED_RT"
                }
            })

            const latest_announcement_data = await this.prismaService.announcement.count({
                take: 5,
                orderBy: {
                    Dibuat_pada: "desc"
                }
            })

            return {
                total_submissions_pending: total_submissions_pending,
                total_submissions_diajukan: total_submissions_diajukan,
                total_submissions_approved_rt: total_submissons_approved_rt,
                total_submissions_approved_kepala: total_submissions_approved_kepala,
                latest_submissions_announcement: latest_announcement_data
            }
            //

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }


    async superAdminDashboard(user_id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the user id from authorization!")

        try {

            const data_warga = await this.prismaService.user.count()

            const data_kepala_desa = await this.prismaService.user.count({
                where: {
                    Role: "KEPALA_DESA"
                }
            })

            const data_rt = await this.prismaService.rt.count()

            const data_rw = await this.prismaService.rw.count()

            return {
                total_warga: data_warga,
                total_kepala: data_kepala_desa,
                total_rt: data_rt,
                total_rw: data_rw,
            }

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async rtDashboard(user_id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the user id from authorization!")

        try {

            // find the leader first!
            const findLeader = await this.prismaService.rt.findFirst({
                where: {
                    Leader_Id: user_id
                }
            })
            //

            const total_warga_rt = await this.prismaService.user.count({
                where: {
                    RtId: findLeader?.Id,
                    Role: "WARGA"
                }
            })

            const total_announcement_rt = await this.prismaService.announcement.count({
                where: {
                    RtId: findLeader?.Id,
                }
            })

            return {
                total_warga: total_warga_rt,
                total_announcement: total_announcement_rt
            }

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async rwDashboard(user_id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the user id from authorization!")

        try {

            // find the leader first!
            const findLeader = await this.prismaService.rw.findFirst({
                where: {
                    Leader_Id: user_id
                }
            })
            //

            const total_warga_rw = await this.prismaService.user.count({
                where: {
                    RwId: findLeader?.Id,
                    Role: "WARGA"
                }
            })

            const total_announcement_rw = await this.prismaService.announcement.count({
                where: {
                    RwId: findLeader?.Id
                }
            })

            return {
                total_warga: total_warga_rw,
                total_announcement: total_announcement_rw
            }

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async kepalaDesaDashboard(user_id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the user id from authorization!")

        try {

            // find the leader first!
            const findLeader = await this.prismaService.village.findFirst({
                where: {
                    Leader_VillageId: user_id
                }
            })
            //

            const total_submissions_approvedKepala = await this.prismaService.submissions.count({
                where: {
                    Status: "APPROVED_KEPALA_DESA"
                }
            })

            const submissions_all = await this.prismaService.submissions.findMany({
                where: {
                    Status: "APPROVED_KEPALA_DESA"
                }
            })

            const total_submissions_lates = await this.prismaService.submissions.count({
                take: 5,
                orderBy: {
                    Tanggal_pengajuan: "desc"
                }
            })

            const total_warga_desa = await this.prismaService.user.count({
                where: {
                    VillageId: findLeader?.Leader_VillageId
                }
            })

            return {
                total_submissions_approved_kepala: total_submissions_approvedKepala,
                submissions_data: submissions_all,
                total_submissions_lates: total_submissions_lates,
                total_warga: total_warga_desa
            }


        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }
}

export default DashboardService