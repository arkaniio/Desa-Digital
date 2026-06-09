import { Module } from "@nestjs/common";
import TokenService from "./token.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_AUTH ?? "yondaktaukoktanyasaya",
            signOptions: { expiresIn: "7d" },
        }),
    ],
    providers: [TokenService],
    exports: [TokenService]
})

export class TokenModule { }