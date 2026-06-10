import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PasswordModule } from "../common/services/password/password.module";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

@Module({
    imports: [PrismaModule, PasswordModule],
    providers: [AdminService],
    controllers: [AdminController]
})

export class AdminModule { }