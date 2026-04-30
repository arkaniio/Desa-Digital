import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BufferUpload } from '../common/helpers/cloudinary_helper';
import { CheckIsNullWitMulterDokumen } from '../common/helpers/null-check.helper';
import { PrismaService } from '../prisma/prisma.service';

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
                    Nomor_surat_rt: Number(data.Nomor_surat_rt),
                    UserId: user_id,
                    RtId: Number(data.RtId),
                    RwId: Number(data.RwId),
                    Dokumen_pengajuan: dataFile,
                    Tipe_Surat: data.Tipe_Surat,
                    Keperluan: data.Keperluan,
                    Tanggal_pengajuan: new Date().toISOString()
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
                    id: Number(id),
                    UserId: user_id
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

                const get_data_signature = await tx.digital_Signature.findFirst({
                    where: {
                        SubmissionsId: Number(id)
                    }
                })

                if (!get_data_signature) {

                    const update_data = await CheckIsNullWitMulterDokumen(data, file, "Dokumen")

                    if (!update_data) throw new BadRequestException("Failed to get payload in update data!")

                    const update_submissions = await tx.submissions.update({
                        where: {
                            id: Number(id)
                        },
                        data: update_data
                    })

                    if (update_submissions == null) throw new BadRequestException("Failed to update!")

                    return true

                } else {

                    const update_data = await CheckIsNullWitMulterDokumen(data, file, "Dokumen")

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

                }


            } catch (error) {
                throw new BadRequestException(error.message)
            }

        })

    }

    async getAllSubmissions(user_id: number, query: any) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id from token!")

        const { page, limit, search_query } = query

        const skip = (page - 1) * limit

        if (search_query) {

            const isNumber = search_query?.trim() !== "" && !isNaN(search_query)

            const Number_convert = isNumber ? Number(search_query) : undefined

            const where: any = {
                OR: [
                    {
                        Keperluan: {
                            contains: search_query,
                            mode: "insensitive"
                        }
                    },
                    ...(isNumber ? [
                        {
                            Nomor_surat_rt: {
                                equals: Number_convert
                            }
                        }
                    ] : [])
                ]
            }

            try {

                const [data, total_data] = await Promise.all([
                    this.prisma.submissions.findMany({
                        skip: skip,
                        take: limit,
                        where: where,
                        select: {
                            Nomor_surat_rt: true,
                            Keperluan: true,
                            Keterangan_pengajuan: true,
                            Dokumen_pengajuan: true,
                            Rt: true,
                            Rw: true,
                            digitalSignatures: true
                        },
                    }),
                    this.prisma.submissions.count({ where: where })
                ])

                if (!data) throw new BadRequestException("Failed to get the total data and data!")

                return {
                    data: data,
                    meta: {
                        total: total_data,
                        page: page,
                        limit: limit,
                        skip: skip,
                        last_page: Math.ceil(total_data / limit)
                    }
                }

            } catch (error) {
                throw new BadRequestException(error.message)
            }
        }

        try {

            const [data, total_data] = await Promise.all([
                this.prisma.submissions.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: {
                        id: "asc"
                    },
                    select: {
                        Nomor_surat_rt: true,
                        Keperluan: true,
                        Keterangan_pengajuan: true,
                        Dokumen_pengajuan: true,
                        Rt: true,
                        Rw: true,
                        digitalSignatures: true
                    }
                }),
                this.prisma.submissions.count()
            ])

            if (!data) throw new BadRequestException("Failed to get the data and total data!")

            return {
                data: data,
                meta: {
                    total: total_data,
                    page: page,
                    limit: limit,
                    skip: skip,
                    last_page: Math.ceil(total_data / limit)
                }
            }


        } catch (error) {
            throw new BadRequestException(error.message)
        }


    }


}


