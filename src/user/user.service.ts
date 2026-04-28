import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { normalizeEmail } from 'validator';
import { CheckIsNullWithNumber, CheckIsNullWitMulter } from '../common/helpers/null-check.helper';
import { ConfigureCloudinanry } from 'src/config/cloudinary.config.js';

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
        if (!password_hash == undefined || password_hash == null) throw new BadRequestException("Failed to hashing password!")

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

        if (user_data == undefined || user_data == null) throw new BadRequestException("Failed to get the data!")

        const isPasswordValid = await bcrypt.compare(data.Password, user_data?.Password)
        if (isPasswordValid == undefined || !isPasswordValid) throw new BadRequestException("Failed to compare the password!")

        const token = this.jwtService.sign({
            id: user_data.id,
            email: user_data.Email,
            role: user_data.Role,
            username: user_data.Username
        })

        return token

    }

    async getProfile(user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const isNumber = user_id != 0 ? Number(user_id) : undefined

            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: isNumber
                },
                include: {
                    Village: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    }
                }
            })

            if (!data_user && data_user == undefined || data_user == null) throw new BadRequestException("Failed to get the data user!")

            return data_user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateProfile(file_path: Express.Multer.File, user_id: number, data: any) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        const update_data = await CheckIsNullWitMulter(data, file_path)

        //debug
        console.log(update_data)
        //

        if (!update_data && update_data == undefined || update_data == null) throw new BadRequestException("Failed to get the payload of the request!")

        try {

            const update_users = await this.prisma.user.update({
                where: {
                    id: Number(user_id)
                },
                data: update_data
            })

            if (!update_users && update_users == undefined || update_users == null) throw new BadRequestException("Failed to get the data update!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}