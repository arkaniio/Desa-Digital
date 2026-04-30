import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CheckIsNullWitMulterAvatar } from '../common/helpers/null-check.helper';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async registerUser(data: any) {

        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        })
        if (user_data) throw new BadRequestException("Email has been already exists!")

        const password_hash = await bcrypt.hash(data.Password, 10)
        if (!password_hash) throw new BadRequestException("Failed to hashing password!")

        try {
            const user = await this.prisma.user.create({
                data: {
                    Username: data.Username,
                    Email: data.Email,
                    Address: data.Address,
                    Password: password_hash,
                    Role: data.Role,
                    VillageId: data.VillageId
                }
            })

            return user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async loginUser(data: any) {

        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        })

        if (!user_data) throw new BadRequestException("Failed to get the data!")

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

    async getProfile(user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: Number(user_id)
                },
                select: {
                    id: true,
                    Username: true,
                    Email: true,
                    Address: true,
                    Role: true,
                    Avatar: true,
                    VillageId: true,
                    Created_at: true,
                    Updated_at: true,
                    Village: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    }
                }
            })

            if (!data_user) throw new BadRequestException("Failed to get the data user!")

            return data_user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateProfile(file_path: Express.Multer.File, user_id: number, data: any) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        const update_data = await CheckIsNullWitMulterAvatar(data, file_path, "Avatar")

        if (!update_data || Object.keys(update_data).length === 0) throw new BadRequestException("Failed to get the payload of the request!")

        try {

            const update_users = await this.prisma.user.update({
                where: {
                    id: Number(user_id)
                },
                data: update_data
            })

            if (!update_users) throw new BadRequestException("Failed to get the data update!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}