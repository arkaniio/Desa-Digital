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
exports.AnnouncementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_helper_1 = require("../common/helpers/cloudinary_helper");
const null_check_helper_1 = require("../common/helpers/null-check.helper");
const announcement_mapping_1 = require("./constants/announcement.mapping");
let AnnouncementService = class AnnouncementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewAnnouncement(data, user_id, file) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get data from token!");
        try {
            const filebuffer_cloud = await (0, cloudinary_helper_1.BufferUpload)(file.buffer, "Image");
            if (!filebuffer_cloud)
                throw new common_1.BadRequestException("Failed to get the buffer for upload in cloudinary!");
            const data_Image = filebuffer_cloud.secure_url;
            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
                    Image: data_Image,
                    AuthorId: user_id,
                    RwId: data.RwId,
                    RtId: data.RtId,
                }
            });
            if (!data_create)
                throw new common_1.BadRequestException("Failed to create data!");
            return data_create;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteAnnouncement(user_id, id) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the data user from the token!");
        if (id == null && id == undefined)
            throw new common_1.BadRequestException("Failed to get id from the parameters on url!");
        try {
            const findDataUsingId = await this.prisma.announcement.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == undefined && findDataUsingId == null)
                throw new common_1.NotFoundException("Failed to find the data that you want to delete it!");
            if (findDataUsingId.AuthorId != user_id)
                throw new common_1.BadRequestException("Cannot delete others rt or rw announcement!");
            const deleteData = await this.prisma.announcement.delete({
                where: {
                    id: id,
                    AuthorId: user_id
                }
            });
            if (!deleteData)
                throw new common_1.BadRequestException("Not found!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateAnnouncement(user_id, id, data, file) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the id from token!");
        if (id == undefined || id == null)
            throw new common_1.NotFoundException("Failed to detect id from the params!");
        try {
            const findDataUsingId = await this.prisma.announcement.findFirst({
                where: {
                    id: id
                }
            });
            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined)
                throw new common_1.NotFoundException("Failed to find the data that you want to delete it!");
            if (findDataUsingId.AuthorId != user_id)
                throw new common_1.BadRequestException("Cannot to update others rt or rw annoucmenent!");
            const payload_update = await (0, null_check_helper_1.CheckIsNullWitMulterAnnouncement)(data, file, "Announcement");
            if (!payload_update || Object.keys(payload_update).length === 0)
                throw new common_1.BadRequestException("Failed to get the payload of the data!");
            const update_data_db = await this.prisma.announcement.update({
                where: {
                    id: id,
                    AuthorId: user_id
                },
                data: payload_update
            });
            if (!update_data_db)
                throw new common_1.BadRequestException("Failed to update the data because the data is nill!");
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllAnnouncement(user_id, query, autorId) {
        if (user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the id from token!");
        const { page, limit, search_query } = query;
        const skip = (page - 1) * limit;
        if (search_query) {
            const where_clause = (0, announcement_mapping_1.WHERE_CLAUSE_SEARCH_ANNOUNCEMENT)(query, search_query, autorId);
            if (where_clause == undefined)
                throw new common_1.BadRequestException("Failed to get the query!");
            try {
                const [data, total_data] = await Promise.all([
                    this.prisma.announcement.findMany({
                        skip: skip,
                        take: limit,
                        where: where_clause,
                        select: {
                            Title: true,
                            Content: true,
                            Author: true,
                            Dibuat_pada: true
                        },
                    }),
                    this.prisma.announcement.count({ where: where_clause })
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
                this.prisma.announcement.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: {
                        id: "asc"
                    },
                    select: {
                        Title: true,
                        Content: true,
                        Author: true,
                        Dibuat_pada: true
                    }
                }),
                this.prisma.announcement.count({
                    where: {
                        AuthorId: autorId
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
};
exports.AnnouncementService = AnnouncementService;
exports.AnnouncementService = AnnouncementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnouncementService);
//# sourceMappingURL=announcement.service.js.map