import { BadRequestException, Injectable } from "@nestjs/common";
import PasswordService from "../common/services/password/password.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {

    constructor(
        private passwordService: PasswordService,
        private prismaService: PrismaService
    ) { }

    //Kepala desa account
    async createKepalaDesaAccount(data: any) {

        try {

            const hashPassword = await this.passwordService.hashPassword(data.Password)

            data.Password = hashPassword

            data.Role = "KEPALA_DESA"

            const user = await this.prismaService.user.create({
                data: data
            })

            if (!user) throw new BadRequestException("Failed to create the user account for kepala desa!")

            return user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }
    //

    //Rw Account
    async createRwAccount(data: any) {

        try {

            const hashPassword = await this.passwordService.hashPassword(data.Password)

            data.Password = hashPassword

            data.Role = "RW"

            const user = await this.prismaService.user.create({
                data: data
            })

            if (!user) throw new BadRequestException("Failed to create the user account for kepala desa!")

            return user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }
    //

    //Rt Account
    async createRtAccount(data: any) {

        try {

            const hashPassword = await this.passwordService.hashPassword(data.Password)

            data.Password = hashPassword

            data.Role = "RT"

            const user = await this.prismaService.user.create({
                data: data
            })

            if (!user) throw new BadRequestException("Failed to create the user account for kepala desa!")

            return user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }
    //
}
