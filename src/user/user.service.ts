import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
        if (user_data) throw Error("email has been already exists!")

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
            if (!user) {
                throw new BadRequestException("Failed to create new user!")
            }

            return {
                user: {
                    id: user.id,
                    username: user.Username,
                    email: user.Email,
                    role: user.Role,
                    created_at: user.Created_at,
                    updated_at: user.Updated_at
                }
            }
        } catch (error) {
            throw new BadRequestException("Failed to create the user!")
        }

    }

    async loginUser(data: any) {

        const user_data = await this.prisma.user.findUnique({
            where: {
                Email: data.Email
            }
        })
        if (!user_data) throw Error("User not found!")

        const isPasswordValid = await bcrypt.compare(data.Password, user_data.Password)
        if (!isPasswordValid) throw Error("Invalid password!")

        const token = this.jwtService.sign({
            id: user_data.id,
            email: user_data.Email,
            role: user_data.Role,
            username: user_data.Username
        })

        return {
            access_token: token,
            user: {
                Username: user_data.Username,
                Email: user_data.Email,
                Created_at: user_data.Created_at,
                Updated_at: user_data.Updated_at
            }
        }

    }

    async getProfile(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }

    async updateProfile(user_id: number, data: any) {

        if (!user_id) throw new UnauthorizedException("Failed to detect the user id!")

        const update_data: any = {}
        if (update_data.Username) update_data.Username = data.Username
        if (update_data.Email) update_data.Email = data.Email
        if (update_data.Password) {

            const password_hash = await bcrypt.hash(data.Password, 10)
            update_data.Password = password_hash

        }

        try {

            const update_users = await this.prisma.user.update({
                where: {
                    id: user_id
                },
                data: update_data
            })


            if (!update_users) throw new BadRequestException("Failed to update the user data!")

            return {
                data: {
                    username: update_users,
                    email: update_users.Email,
                    password: update_users.Password,
                    updated_at: update_users.Updated_at
                }
            }

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

}
