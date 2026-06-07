import { Module } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import PasswordService from "../password/password.service";
import { PrismaModule } from "../../../prisma/prisma.module";
import { PasswordModule } from "../password/password.module";
import BoostrapService from "./bootstrap.service";

@Module({
    imports: [PrismaModule, PasswordModule],
    providers: [BoostrapService]
})

export class BootstrapModule { }