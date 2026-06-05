import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CheckIsNullWitMulterAvatar } from '../common/helpers/null-check.helper';

@Injectable()
export class UserService {

    constructor(
        private prisma: PrismaService,
    ) { }

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