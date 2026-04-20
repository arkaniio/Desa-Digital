import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';
import { normalizeEmail } from 'validator';

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
        if (user_data) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Email has been already exists!",
            false
        )

        const password_hash = await bcrypt.hash(data.Password, 10)
        if (!password_hash) throw Error("Failed to hash the password!")

        try {
            const user = await this.prisma.user.create({
                data: {
                    Username: data.Username,
                    Email: data.Email,
                    Password: password_hash,
                    Role: data.Role
                }
            })

            return ResponseSuccess(
                user,
                HttpStatus.OK,
                "Successfully to create new user!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to create new user!",
                false
            )
        }

    }

    async loginUser(data: any) {

        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        })

        if (user_data == undefined || user_data == null) return ResponseError(
            normalizeEmail,
            HttpStatus.BAD_REQUEST,
            "Failed to get the user data using email user!",
            false
        )

        const isPasswordValid = await bcrypt.compare(data.Password, user_data?.Password)
        if (!isPasswordValid) throw Error("Invalid password!")

        const token = this.jwtService.sign({
            id: user_data.id,
            email: user_data.Email,
            role: user_data.Role,
            username: user_data.Username
        })

        return ResponseSuccess(
            token,
            HttpStatus.OK,
            "Success to login as a user!",
            true
        )

    }

    async getProfile(user_id: number) {

        if (user_id == undefined || user_id == null) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to get the id number!",
            false
        )

        try {

            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: Number(user_id)
                },
                include: {
                    identities: true
                }
            })

            if (data_user == undefined || data_user == null) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user data!",
                false
            )

            return ResponseSuccess(
                data_user,
                HttpStatus.OK,
                "Success to get the profile!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to get the profile!",
                false
            )
        }

    }

    async updateProfile(user_id: number, data: any) {

        if (user_id == undefined || user_id == null) return ResponseError(
            null,
            HttpStatus.UNAUTHORIZED,
            "Failed to get the user id!",
            false
        )

        try {

            const update_data: any = {}
            if (data.Username != undefined || data.Username != null)
                update_data.Username = data.Username
            if (data.Email != undefined || data.Email != null)
                update_data.Email = data.Email
            if (data.Password != undefined || data.Password != null) {

                const password_hash = await bcrypt.hash(data.Password, 10)

                if (password_hash == undefined || password_hash == null) return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to hashing the password!",
                    false
                )

                update_data.Password = password_hash

            }

            const update_users = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: update_data
            })

            if (update_users == undefined || update_users == null) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to update the users!",
                false
            )

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Success to get the user profile!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to update the users data!",
                false
            )
        }
    }

}
