import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckIsNull } from '../common/helpers/null-check.helper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DigitalSignatureService {

    constructor(private prisma: PrismaService) { }

    async createDigitalSignature(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id data from token!")

        try {

            const create_data = await this.prisma.digital_Signature.create({
                data: {
                    No_surat_desa: Number(data.No_surat_desa),
                    SubmissionsId: Number(data.SubmissionsId),
                    Rt_desa_sign: Boolean(data.Rt_desa_sign),
                    Kepala_desa_sign: Boolean(data.Kepala_desa_sign)
                }
            })

            if (create_data == null) throw new BadRequestException("Failed to create data because the payload is nill!")

            return create_data

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateDigitalSignature(data: any, user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get id data from token!")

        if (id == null) throw new BadRequestException("Failed to get id from parameter!")

        return this.prisma.$transaction(async (tx) => {

            try {

                const data_update = CheckIsNull(data)

                if (!data_update || Object.keys(data_update).length == 0) throw new BadRequestException("Failed to get payload from data update!")

                const data_digital = await tx.digital_Signature.update({
                    where: {
                        id: Number(id)
                    },
                    data: data_update
                })

                if (data_digital.Rt_desa_sign == true && data_digital.Kepala_desa_sign == true) {

                    const update_submissions = await tx.submissions.update({
                        where: {
                            id: data_digital.SubmissionsId
                        },
                        data: {
                            Keterangan_pengajuan: "DITERIMA",
                            Status: "SUCCESS"
                        }
                    })

                    if (!update_submissions) throw new BadRequestException("Failed to update submissions data status!")

                }

                return true

            } catch (error) {
                throw new BadRequestException(error.message)
            }
        })

    }

    async deleteDigitalSignature(user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get id from token!")

        if (id == null) throw new BadRequestException("Failed to get the id from parameter!")

        try {

            const delete_data = await this.prisma.digital_Signature.delete({
                where: {
                    id: Number(id)
                }
            })

            if (delete_data == null) throw new BadRequestException("Failed to delete data because the data that you want to delete is null!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}
