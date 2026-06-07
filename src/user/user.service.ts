import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CheckIsNullWitMulterAvatar } from '../common/helpers/null-check.helper';
import { SELECT_USER_DATA } from './constants/user_select';
import PasswordService from '../common/services/password/password.service';
import { hash } from 'node:crypto';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService
    ) { }

    //This is for create the kepala desa, rw account

    async createKepalaDesaAccount(user_id: number, data: any) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from authentication")

        try {

            if (data.Password) {

                const hashPassword = await this.passwordService.hashPassword(data.Password)

                if (!hashPassword) throw new BadRequestException("Failed to hash the password!")

                data.Password = hashPassword

            }

            return this.prisma.user.create({
                data: data
            })

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    //

    async getProfile(user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: user_id
                },
                select: SELECT_USER_DATA
            }
            )

            if (!data_user) throw new BadRequestException("Failed to get the data user!")

            return data_user

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateProfile(file_path: Express.Multer.File, user_id: number, data: any) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const update_data = await CheckIsNullWitMulterAvatar(data, file_path, "Avatar")

            if (!update_data || Object.keys(update_data).length === 0) throw new BadRequestException("Failed to get the payload of the request!")

            if (update_data.Password) {
                const hashPassword = await this.passwordService.hashPassword(update_data.Password)
                if (!hashPassword) throw new BadRequestException("Failed to hashing password!")
                update_data.Password = hashPassword
            }

            const update_users = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: update_data
            })

            if (!update_users) throw new BadRequestException("Failed to update the users data!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}