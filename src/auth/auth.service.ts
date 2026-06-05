import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async findUserByEmail(email: string) {

        return await this.prisma.user.findUnique({
            where: {
                Email: email
            }
        })

    }

    async findUserByUsername(username: string) {

        return await this.prisma.user.findUnique({
            where: {
                Username: username
            }
        })

    }

    async generateAuth(data: any) {

        return await this.prisma.user.create(data)

    }

    async validateOrCreate(profile: any) {

        const email = profile.emails[0].value

        let user = await this.findUserByEmail(email)

        if (!user) {

            user = await this.generateAuth({
                Username: profile.displayName,
                Email: email,
                Password: null,
                Avatar: profile.photos?.[0]?.value,
                Role: "WARGA"
            })

        }

        return this.jwtService.sign({
            id: user.id,
            email: user.Email,
            role: user.Role
        })

    }

    async registerUser(data: any) {

        const user_data = await this.findUserByEmail(data.Email)

        if (user_data != null || user_data != undefined) throw new BadRequestException("Email has been already exists!")

        const user_name = await this.findUserByUsername(data.Username)

        if (user_name != null || user_data != undefined) throw new BadRequestException("Username has been already exists!")

        const password_hash = await bcrypt.hash(data.Password, 10)
        if (!password_hash) throw new BadRequestException("Failed to hashing password!")

        try {

            const user = await this.generateAuth(data)

            return user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async loginUser(data: any) {

        const user_data = await this.findUserByEmail(data.Email)

        if (!user_data) throw new NotFoundException("Email not found!")

        const isPasswordValid = await bcrypt.compare(data.Password, user_data.Password)
        if (!isPasswordValid) throw new BadRequestException("Failed to compare the password!")

        const token = this.jwtService.sign({
            id: user_data.id,
            email: user_data.Email,
            role: user_data.Role,
            username: user_data.Username
        })

        return token

    }

}
