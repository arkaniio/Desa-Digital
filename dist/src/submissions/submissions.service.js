"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_helper_1 = require("../common/helpers/cloudinary_helper");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
const prisma_service_1 = require("../prisma/prisma.service");
const node_crypto_1 = require("node:crypto");
let SubmissionsService = class SubmissionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSubmissions(data, user_id, file) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the id data from token");
        try {
            const buffe_data_file = await (0, cloudinary_helper_1.BufferUpload)(file.buffer, "Dokumen");
            const dataFile = buffe_data_file.secure_url;
            const createData = await this.prisma.submissions.create({
                data: {
                    Nomor_surat_rt: data.Nomor_surat_rt,
                    SenderId: user_id,
                    RtId: data.RtId,
                    RwId: data.RwId,
                    Dokumen_pengajuan: dataFile,
                    Tipe_Surat: data.Tipe_Surat,
                    Keperluan: data.Keperluan,
                    Tanggal_pengajuan: new Date().toISOString()
                }
            });
            if (!createData)
                throw new common_1.BadRequestException("Failed to get payload in data!");
            return createData;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteSubmissions(user_id, id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get data from token!");
        if (id == null)
            throw new common_1.NotFoundException("Failed to get id from param!");
        try {
            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId)
                throw new common_1.NotFoundException("Failed to detect the id that you want to delete it!");
            const deleteData = await this.prisma.submissions.delete({
                where: {
                    id: Number(id),
                    SenderId: user_id
                }
            });
            if (!deleteData || deleteData == null && deleteData == undefined)
                throw new common_1.BadRequestException("Can't find the data that you want to delete it!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateSubmissions(data, id, user_id, file) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get id from token!");
        if (id == null && id == undefined)
            throw new common_1.NotFoundException("Failed to get id from param!");
        try {
            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined)
                throw new common_1.NotFoundException("Failed to detect the id that you want to delete it!");
            const update_data = await (0, null_check_helper_1.CheckIsNullWitMulterDokumen)(data, file, "Dokumen");
            if (!update_data || Object.keys(update_data).length == 0)
                throw new common_1.BadRequestException("Failed to get payload data!");
            const update_db = await this.prisma.submissions.update({
                where: {
                    id: Number(id),
                    SenderId: user_id
                },
                data: update_data
            });
            if (!update_db)
                throw new common_1.BadRequestException("Failed to update data because the data is not found!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllSubmissions(user_id, query) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the id from token!");
        const { page, limit, search_query } = query;
        const skip = (page - 1) * limit;
        if (search_query) {
            const isNumber = search_query?.trim() !== "" && !isNaN(search_query);
            const Number_convert = isNumber ? Number(search_query) : undefined;
            const where = {
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
            };
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
                ]);
                if (!data)
                    throw new common_1.BadRequestException("Failed to get the total data and data!");
                return {
                    data: data,
                    meta: {
                        total: total_data,
                        page: page,
                        limit: limit,
                        skip: skip,
                        last_page: Math.ceil(total_data / limit)
                    }
                };
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
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
            ]);
            if (!data)
                throw new common_1.BadRequestException("Failed to get the data and total data!");
            return {
                data: data,
                meta: {
                    total: total_data,
                    page: page,
                    limit: limit,
                    skip: skip,
                    last_page: Math.ceil(total_data / limit)
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateSubmissionsWithRt(user_id, data, id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to detect the auth id from parameter!");
        if (id == null && id == undefined)
            throw new common_1.NotFoundException("Failed to get the id in params to update data!");
        try {
            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined)
                throw new common_1.NotFoundException("Failed to detect the id that you want to update with rt!");
            const update_data = (0, null_check_helper_1.CheckIsNull)(data);
            if (!update_data || Object.keys(data).length == 0)
                throw new common_1.BadRequestException("Update data cannot be success!");
            if (update_data.Rt_desa_sign !== undefined) {
                const update_data_rt_sign = await this.prisma.submissions.update({
                    where: {
                        id: id,
                    },
                    data: update_data
                });
                if (!update_data_rt_sign)
                    throw new common_1.BadRequestException("Failed to get update data and rt sign!");
                const update_status = await this.prisma.submissions.update({
                    where: {
                        id: id
                    },
                    data: {
                        Status: "APPROVED_RT"
                    }
                });
                if (!update_status)
                    throw new common_1.BadRequestException("Failed to update the status of submissions");
                return true;
            }
            else {
                throw new common_1.BadRequestException("Failed to update others data for peoples in the village!");
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateSubmissionsWithKepalaDesa(user_id, data, id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the user id from token and auth parameter!");
        if (id == null && id == undefined)
            throw new common_1.NotFoundException("Failed to get the id from parameter!");
        try {
            const update_data = (0, null_check_helper_1.CheckIsNull)(data);
            if (!update_data || Object.keys(update_data).length == 0 || update_data.Kepala_desa_sign == undefined)
                throw new common_1.BadRequestException("Failed to get the value of the request body!");
            const findDataUsingId = await this.prisma.submissions.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined)
                throw new common_1.NotFoundException("Failed to found the submissions data!");
            if (update_data.Rt_desa_sign == true && update_data.Kepala_desa_sign == true) {
                const secureSignature = (0, node_crypto_1.createHash)('sha256')
                    .update(`${id}-${findDataUsingId.SenderId}-${Date.now()}-${(0, node_crypto_1.randomBytes)(4).toString('hex')}`)
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
                });
                if (!update_data_submissions_new)
                    throw new common_1.BadRequestException("Failed to get the data submissions for update!");
            }
            const update_data_desa_sign = await this.prisma.submissions.update({
                where: {
                    id: id
                },
                data: {
                    Kepala_desa_sign: update_data.Kepala_desa_sign,
                    Status: "APPROVED_KEPALA_DESA"
                }
            });
            if (!update_data_desa_sign)
                throw new common_1.BadRequestException("Failed to update the data because the request body is null!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async verifySubmission(signature) {
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
                        Username: true,
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
        if (!submission) {
            throw new common_1.NotFoundException("The document of letter!");
        }
        return submission;
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map