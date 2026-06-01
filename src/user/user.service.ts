import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

        const user_name = await this.prisma.user.findUnique({
            where: {
                Username: data.Username
            }
        })
        if (user_name) throw new BadRequestException("Username has been already exists!")

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
                    Created_at: new Date().toISOString(),
                    Updated_at: new Date().toISOString(),
                    VillageId: Number(data.VillageId),
                    RtId: data.RtId,
                    RwId: data.RwId
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
                    },
                    Rt: {
                        select: {
                            Number: true,
                            RwId: true,
                            Rw: {
                                select: {
                                    Name: true,
                                    Village: {
                                        select: {
                                            Name: true,
                                            Address: true
                                        }
                                    },
                                    Leader: {
                                        select: {
                                            Username: true,
                                            Address: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    LedVillages: {
                        select: {
                            Leader_Village: {
                                select: {
                                    Username: true,
                                    Address: true
                                }
                            }
                        }
                    },
                    LedRws: {
                        select: {
                            Name: true,
                            Village: {
                                select: {
                                    Name: true,
                                    Address: true
                                }
                            },
                            Leader: {
                                select: {
                                    Username: true,
                                    Address: true
                                }
                            }
                        }
                    },
                    LedRts: {
                        select: {
                            Number: true,
                            RwId: true,
                            Rw: {
                                select: {
                                    Name: true,
                                    Village: {
                                        select: {
                                            Name: true,
                                            Address: true
                                        }
                                    },
                                    Leader: {
                                        select: {
                                            Username: true,
                                            Address: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
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

            if (update_data.Password != null || update_data.Password != undefined) {
                const hashPassword = await bcrypt.hash(update_data.Password, 10)
                if (!hashPassword || hashPassword == null && hashPassword == undefined) {
                    throw new BadRequestException("Failed to get and hashing the data password for update data in users data!")
                }
            }

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