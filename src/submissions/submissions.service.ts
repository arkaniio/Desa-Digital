import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BufferUpload } from '../common/helpers/cloudinary_helper';
import { CheckIsNull, CheckIsNullWitMulterDokumen } from '../common/helpers/null-check.helper';
import { PrismaService } from '../prisma/prisma.service';
import { createHash, randomBytes } from 'node:crypto';
import { find } from 'rxjs';

@Injectable()
export class SubmissionsService {

    constructor(private prisma: PrismaService) { }


    async createSubmissions(data: any, user_id: number, file: Express.Multer.File) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id data from token")

        if (!file || file == null && file == undefined) throw new BadRequestException("File in this submissions must be required!")

        try {

            const buffe_data_file = await BufferUpload(file.buffer, "Dokumen")

            if (!buffe_data_file) throw new BadRequestException("Failed to get the file!")

            const dataFile = buffe_data_file.secure_url

            const createData = await this.prisma.submissions.create({
                data: {
                    Nomor_surat_rt: Number(data.Nomor_surat_rt),
                    SenderId: user_id,
                    RtId: data.RtId,
                    RwId: data.RwId,
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

        if (id == null && id == undefined) throw new NotFoundException("Failed to get id from param!")

        try {

            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            })

            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined) throw new NotFoundException("Failed to detect the id that you want to delete it!")

            const deleteData = await this.prisma.submissions.delete({
                where: {
                    id: Number(id),
                    SenderId: user_id
                }
            })

            if (!deleteData || deleteData == null && deleteData == undefined) throw new BadRequestException("Can't find the data that you want to delete it!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateSubmissions(data: any, id: number, user_id: number, file: Express.Multer.File) {

        if (user_id == null) throw new UnauthorizedException("Failed to get id from token!")

        if (id == null && id == undefined) throw new NotFoundException("Failed to get id from param!")

        try {

            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            })

            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined) throw new NotFoundException("Failed to detect the id that you want to delete it!")

            const update_data = await CheckIsNullWitMulterDokumen(data, file, "Dokumen")

            if (!update_data || Object.keys(update_data).length == 0) throw new BadRequestException("Failed to get payload data!")

            const update_db = await this.prisma.submissions.update({
                where: {
                    id: Number(id),
                    SenderId: user_id
                },
                data: update_data
            })

            if (!update_db) throw new BadRequestException("Failed to update data because the data is not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }


    async getAllSubmissions(user_id: number, query: any) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id from token!")

        const { page, limit, search_query } = query

        const skip = (page - 1) * limit

        // Jangan Lupa difilter oleh sender id agar tidak bisa get submissions semua orang

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
                ],
                SenderId: user_id
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
                            Rt_desa_sign: true,
                            Kepala_desa_sign: true,
                            QrCodeSignature: true
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
                    where: {
                        SenderId: user_id
                    },
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
                        Rt_desa_sign: true,
                        Kepala_desa_sign: true,
                        QrCodeSignature: true
                    }
                }),
                this.prisma.submissions.count({
                    where: {
                        SenderId: user_id
                    }
                })
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

    async updateSubmissionsWithRt(user_id: number, data: any, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to detect the auth id from parameter!")

        if (id == null && id == undefined) throw new NotFoundException("Failed to get the id in params to update data!")

        try {

            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            })

            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined) throw new NotFoundException("Failed to detect the id that you want to update with rt!")

            const update_data = CheckIsNull(data)

            if (!update_data || Object.keys(data).length == 0) throw new BadRequestException("Update data cannot be success!")

            // Cek jika rt desa sign tidak kosong
            if (update_data.Rt_desa_sign !== undefined) {

                const update_data_rt_sign = await this.prisma.submissions.update({
                    where: {
                        id: id,
                    },
                    data: update_data
                })

                if (!update_data_rt_sign) throw new BadRequestException("Failed to get update data and rt sign!")

                // Update status submissionsq
                const update_status = await this.prisma.submissions.update({
                    where: {
                        id: id
                    },
                    data: {
                        Status: "DISETUJUI OLEH RT"
                    }
                })

                if (!update_status) throw new BadRequestException("Failed to update the status of submissions")

                return true

            } else {
                throw new BadRequestException("Failed to update others data for peoples in the village!")
            }

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateSubmissionsWithKepalaDesa(user_id: number, data: any, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token and auth parameter!")

        if (id == null && id == undefined) throw new NotFoundException("Failed to get the id from parameter!")

        try {

            const update_data = CheckIsNull(data)

            if (!update_data || Object.keys(update_data).length == 0 || update_data.Kepala_desa_sign == undefined) throw new BadRequestException("Failed to get the value of the request body!")

            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            })

            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined) throw new NotFoundException("Failed to found the submissions data!")

            if (update_data.Rt_desa_sign == true && update_data.Kepala_desa_sign == true) {

                // Generate token signature unik yang aman
                const secureSignature = createHash('sha256')
                    .update(`${id}-${findDataUsingId.SenderId}-${Date.now()}-${randomBytes(4).toString('hex')}`)
                    .digest('hex');

                const update_data_submissions_new = await this.prisma.submissions.update({
                    where: {
                        id: id
                    },
                    data: {
                        QrCodeSignature: secureSignature,
                        Tanggal_selesai: new Date().toISOString(),
                        Status: "SUCCESS",
                    }
                })

                if (!update_data_submissions_new) throw new BadRequestException("Failed to get the data submissions for update!")

            }

            // Jika rt belum tanda tangan maka kepala desa bisa menandatangani duluan
            const update_data_desa_sign = await this.prisma.submissions.update({
                where: {
                    id: id
                },
                data: {
                    Kepala_desa_sign: update_data.Kepala_desa_sign,
                    Status: "DISETUJUI KEPALA DESA"
                }
            })

            if (!update_data_desa_sign) throw new BadRequestException("Failed to update the data because the request body is null!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async verifySubmission(signature: string) {
        const submission = await this.prisma.submissions.findUnique({
            where: { QrCodeSignature: signature },
            select: {
                id: true,
                Nomor_surat_rt: true,
                Tipe_Surat: true,
                Status: true,
                Keterangan_pengajuan: true,
                Keperluan: true,
                Tanggal_pengajuan: true,
                Tanggal_selesai: true,
                Sender: {
                    select: {
                        Username: true, // Tampilkan nama pengirim
                        Address: true   // Dan alamatnya untuk validasi
                    }
                },
                Rt: {
                    select: { Number: true }
                },
                Rw: {
                    select: { Name: true }
                }
            }
        });
        // Jika signature tidak ditemukan di DB, berarti surat tersebut palsu / hasil manipulasi
        if (!submission) {
            throw new NotFoundException("The document of letter!");
        }
        return submission;
    }


}


