import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { DigitalSignatureController } from "./digital_signature.controller";
import { DigitalSignatureService } from "./digital_signature.service";

@Module({
    imports: [PrismaModule],
    controllers: [DigitalSignatureController],
    providers: [DigitalSignatureService]
})
export class DigitalSignatureModule { }