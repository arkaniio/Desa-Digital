import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdentityService {

    constructor(private prisma: PrismaService) { }

    async registerIdentity(data: any, user_id: number) {

        const identity_data = await this.prisma.identity.findUnique({
            where: {
                Full_Name: data.Full_Name
            }
        })
        if (identity_data) throw new BadRequestException("the name has been already exists!")
        if (!user_id) throw new UnauthorizedException("Failed to get the user id!")

        try {

            const data_identity = await this.prisma.identity.create(
                {
                    data: {
                        User_Id: user_id,
                        Full_Name: data.Full_Name,
                        Age: data.Age,
                        Adress: data.Adress,
                    }
                }
            )
            if (!data_identity) throw new BadRequestException("Failed to create the new identity!")

            return {
                data: {
                    id: data_identity.id,
                    user_id: data_identity,
                    full_name: data_identity.Full_Name,
                    age: data_identity.Age,
                    adress: data_identity.Adress
                }
            }

        } catch (error) {
            throw new BadRequestException(error)
        }

    }

    async deleteIdentity(id: number) {
        return this.prisma.identity.delete({
            where: {
                id: id
            }
        })
    }

    async updateIdentity(data: any, id: number) {

        if (!id) throw new BadRequestException("id must be required!")

        const update_data: any = {}
        if (data.Full_Name) update_data.Full_Name = data.Full_Name
        if (data.Age) update_data.Age = data.Age
        if (data.Adress) update_data.Adress = data.Adress

        try {

            const update_identity = await this.prisma.identity.update({
                where: {
                    id: id
                },
                data: update_data
            })
            if (!update_identity) throw new BadRequestException("Failed to update identity!")

            return {
                data: {
                    status: true,
                    message: "Success to update the identity!"
                }
            }
        } catch (error) {
            throw new BadRequestException(error)
        }

    }

}
