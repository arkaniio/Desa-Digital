import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import TokenService from '../common/services/token/token.service';
import PasswordService from '../common/services/password/password.service';
import { JwtService } from '@nestjs/jwt';
import { role } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private tokenService: TokenService,
        private passwordService: PasswordService,
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

            if (data.Password) {

                const hashPassword = await this.passwordService.hashPassword(data.Password)

                data.Password = hashPassword

                return await this.prisma.user.create({
                    data: data
                })

            }

            return await this.prisma.user.create({
                data: data
            })

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }


    //validate the auth with google authentication
    async validateOrCreate(profile: any) {

        const email = profile.emails[0].value

        let user = await this.findUserByEmail(email)

        if (!user) {

            user = await this.prisma.user.create({
                data: {
                    Username: profile.displayName,
                    Email: email,
                    Password: "",
                    Avatar: profile.photos?.[0]?.value,
                }
            })

            return user

        }

        return await this.tokenService.generateToken({
            userId: user.id,
            email: user.Email,
            role: user.Role,
            username: user.Username
        })
    }
    //

    async registerUser(data: any) {

        const user_data = await this.findUserByEmail(data.Email)

        if (user_data) throw new BadRequestException("Email has been already exists!")

        try {

            const user = await this.generateAuth(data)

            if (!user) throw new BadRequestException("Failed to create user, something went wrong!")

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

            const token = await this.tokenService.generateToken({
                userId: user_data.id,
                email: user_data.Email,
                role: user_data.Role,
                username: user_data.Username
            })

            return token

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async changePassword(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("User id in authorization must be required!")

        try {

            const hashPassword = await this.passwordService.hashPassword(data.Password)

            data.Password = hashPassword

            const updatePassword = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    Password: hashPassword
                }
            })

            console.log(updatePassword, data.Password)

            if (!updatePassword) throw new BadRequestException("Failed to update password!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}
