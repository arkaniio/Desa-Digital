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
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const response_helper_js_1 = require("../common/helpers/response.helper.js");
let AnnouncementService = class AnnouncementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewAnnouncement(data, user_id) {
        if (user_id == undefined || user_id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user id in auth!", false);
        }
        if (data == undefined || data == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the data in request body!", false);
        }
        try {
            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
                    AuthorId: user_id,
                    RwId: Number(data.RwId),
                    RtId: Number(data.RtId)
                }
            });
            if (!data_create == undefined || data_create == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to create new announcement because the data that you send is nil!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(data_create, common_1.HttpStatus.OK, "Successfully to create new data announcement!", true);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to create new announcement!", false);
        }
    }
    async deletAnnouncement(user_id, id) {
        if (!user_id && id == undefined || user_id && id == null) {
            return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Failed to get the user id and id for the request!", false);
        }
        try {
            const deleteData = await this.prisma.announcement.delete({
                where: {
                    id: Number(id)
                }
            });
            if (!deleteData == undefined || deleteData == null) {
                return (0, response_helper_js_1.ResponseError)(null, common_1.HttpStatus.BAD_REQUEST, "Not found!", false);
            }
            return (0, response_helper_js_1.ResponseSuccess)(true, common_1.HttpStatus.OK, "Successfully to delete the announcement!", false);
        }
        catch (error) {
            return (0, response_helper_js_1.ResponseError)(error, common_1.HttpStatus.BAD_REQUEST, "Failed to delete the data of announcement!", false);
        }
    }
};
exports.AnnouncementService = AnnouncementService;
exports.AnnouncementService = AnnouncementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], AnnouncementService);
//# sourceMappingURL=announcement.service.js.map