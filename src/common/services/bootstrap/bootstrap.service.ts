import { BadGatewayException, BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import PasswordService from "../password/password.service";

@Injectable()
class BoostrapService implements OnModuleInit {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly passwordService: PasswordService
    ) { }

    async onModuleInit() {

        console.log("Checking the role for super_admin...")

        const data = await this.prismaService.user.findFirst({
            where: {
                Role: "SUPER_ADMIN"
            }
        })

        if (!data) {

            let password_super_admin = process.env.SUPER_ADMIN_PASSWORD ?? ""
            let username_super_admin = process.env.SUPER_ADMIN_USERNAME ?? ""
            let email_super_admin = process.env.SUPER_ADMIN_EMAIL ?? ""

            const hash_password = await this.passwordService.hashPassword(password_super_admin)

            if (!hash_password) throw new BadRequestException("Failed to hashing the password!")

            return this.prismaService.user.create({
                data: {
                    Username: username_super_admin,
                    Email: email_super_admin,
                    Password: password_super_admin,
                    Role: "SUPER_ADMIN"
                }
            })
        }

        console.log("Created Super Admin successfully!")
    }

}

export default BoostrapService