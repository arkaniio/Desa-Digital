import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BufferUpload } from '../common/helpers/cloudinary_helper.js';
import { CheckIsNullWitMulter } from '../common/helpers/null-check.helper.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SubmissionsService {

    constructor(private prisma: PrismaService) { }


    async createSubmissions(data: any, user_id: number, file: Express.Multer.File) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id data from token")

        try {

            const buffe_data_file = await BufferUpload(file.buffer, "Dokumen")

            if (!buffe_data_file) throw new BadRequestException("Failed to get the file!")

            const dataFile = buffe_data_file.secure_url

            const createData = await this.prisma.submissions.create({
                data: {
                    Nomor_surat_rt: data.Nomor_surat_rt,
                    UserId: user_id,
                    RtId: data.RtId,
                    RwId: data.RwId,
                    Dokumen_pengajuan: dataFile,
                    Tipe_Surat: data.Tipe_Surat,
                    Keperluan: data.Keperluan,
                    Tanggal_pengajuan: data.Tanggal_pengajuan
                }
            })

            if (!createData) throw new BadRequestException("Failed to get payload in data!")

            return createData

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteSubmissions(user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get data from token!")

        if (id == null) throw new BadRequestException("Failed to get id from param!")

        try {

            const deleteData = await this.prisma.submissions.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!deleteData) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateSubmissions(data: any, id: number, user_id: number, file: Express.Multer.File) {

        if (user_id == null) throw new UnauthorizedException("Failed to get id from token!")

        if (id == null) throw new BadRequestException("Failed to get id from param!")

        return this.prisma.$transaction(async (tx) => {

            try {

                const get_data_signature = await this.prisma.digital_Signature.findFirst({
                    where: {
                        SubmissionsId: Number(id)
                    }
                })

                if (!get_data_signature) throw new UnauthorizedException("Failed to get data signature in db using transaction!")

                const update_data = await CheckIsNullWitMulter(data, file)

                if (!update_data) throw new BadRequestException("Failed to get payload in update data!")

                if (get_data_signature.Rt_desa_sign && get_data_signature.Kepala_desa_sign == true) {

                    update_data.Keterangan_pengajuan = "DITERIMA"
                    update_data.Status = "SUCCESS"
                    update_data.Tanggal_selesai = new Date().toISOString()

                }

                const update_submissions = await tx.submissions.update({
                    where: {
                        id: Number(id)
                    },
                    data: update_data
                })

                if (update_submissions == null) throw new BadRequestException("Failed to update!")

                return true

            } catch (error) {
                throw new BadRequestException(error.message)
            }

        })

    }

}

