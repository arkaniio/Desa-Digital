import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt"
import TokenService from './token.service';
import PasswordService from './password.service';
import { BADFAMILY } from 'node:dns';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private tokenService: TokenService,
        private passwordService: PasswordService
    ) { }

    async findUserByEmail(email: string) {

        try {

            return await this.prisma.user.findUnique({
                where: {
                    Email: email
                }
            })

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async findUserById(user_id: number) {

        try {

            return await this.prisma.user.findFirst({
                where: {
                    id: user_id
                }
            })

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async generateAuth(data: any) {

        try {

            if (data.Password != null) {

                const hashPassword = this.passwordService.hashPassword(data.password)

                data.Password = hashPassword

                return this.prisma.user.create(data)

            }

            return await this.prisma.user.create(data)

        } catch (error) {
            throw new BadRequestException(error.message)
        }

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

        return this.tokenService.generateToken({
            id: user.id,
            Role: user.Role,
            Email: user.Email
        })
    }

    async registerUser(data: any) {

        const user_data = await this.findUserByEmail(data.Email)

        if (user_data) throw new BadRequestException("Email has been already exists!")

        try {

            const user = await this.generateAuth(data)
            if (!user) throw new BadRequestException("Failed to create new user, something went wrong!")

            return user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async loginUser(data: any) {

        const user_data = await this.findUserByEmail(data.Email)

        if (!user_data) throw new NotFoundException("Email not found!")

        const comparePassword = await this.passwordService.comparePassword(user_data.Password, data.Password)
        if (!comparePassword) throw new BadRequestException("Failed to compare new password!")

        try {

            const token = this.tokenService.generateToken({
                id: user_data.id,
                role: user_data.Role,
                email: user_data.Email,
                username: user_data.Username
            })

            return token

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async changePassword(password: string, user_id: number) {

        if (password == null) throw new BadRequestException("Password that you want to change must be required!")

        if (user_id == null) throw new UnauthorizedException("User id in authorization must be required!")

        try {

            const findUser = await this.findUserById(user_id)
            if (!findUser) throw new NotFoundException("Failed to found the user!")

            const comparePassword = await this.passwordService.comparePassword(findUser.Password, password)
            if (!comparePassword) throw new BadRequestException("Failed to compare the password!")

            const updatePassword = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    Password: password
                }
            })

            if (!updatePassword) throw new BadRequestException("Failed to update password!")

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}
