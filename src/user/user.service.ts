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
        if (!user_data) return ResponseError(
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

    async getProfile(id: number) {

        if (id == null) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to get the id number!",
            false
        )

        try {

            const data_user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            if (!data_user) return ResponseError(
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

        if (!user_id) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to get the user id!",
            false
        )

        const update_data: any = {}
        if (update_data.Username) update_data.Username = data.Username
        if (update_data.Email) update_data.Email = data.Email
        if (update_data.Password) {

            const password_hash = await bcrypt.hash(data.Password, 10)

            if (!password_hash) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to hashing the password!",
                false
            )

            update_data.Password = password_hash

        }

        try {

            const update_users = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: update_data
            })


            if (!update_users) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to update the users!",
                false
            )

            return ResponseSuccess(
                update_users,
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
