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
let AnnouncementService = class AnnouncementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewAnnouncement(data, user_id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get data from token!");
        try {
            const isNumberValidate = data != "" && !isNaN(data);
            const validateNumber = isNumberValidate ? Number(data) : 0;
            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
                    AuthorId: user_id,
                    RwId: validateNumber,
                    RtId: validateNumber
                }
            });
            if (!data_create && data_create == undefined || data_create == null)
                throw new common_1.BadRequestException("Failed to create data!");
            return data_create;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deletAnnouncement(user_id, id) {
        if (!user_id && user_id == undefined || user_id == null)
            throw new common_1.UnauthorizedException("Failed to get the data user from the token!");
        try {
            const isNumber = -id != 0 ? Number(id) : undefined;
            const deleteData = await this.prisma.announcement.delete({
                where: {
                    id: isNumber
                }
            });
            if (!deleteData && deleteData == undefined || deleteData == null)
                throw new common_1.BadRequestException("Not found!");
            return true;
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