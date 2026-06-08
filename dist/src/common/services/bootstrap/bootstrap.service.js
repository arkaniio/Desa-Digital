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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const password_service_1 = __importDefault(require("../password/password.service"));
let BoostrapService = class BoostrapService {
    prismaService;
    passwordService;
    constructor(prismaService, passwordService) {
        this.prismaService = prismaService;
        this.passwordService = passwordService;
    }
    async onModuleInit() {
        console.log("Checking the role for super_admin...");
        const data = await this.prismaService.user.findFirst({
            where: {
                Role: "SUPER_ADMIN"
            }
        });
        if (!data) {
            let password_super_admin = process.env.SUPER_ADMIN_PASSWORD ?? "";
            let username_super_admin = process.env.SUPER_ADMIN_USERNAME ?? "";
            let email_super_admin = process.env.SUPER_ADMIN_EMAIL ?? "";
            const hash_password = await this.passwordService.hashPassword(password_super_admin);
            if (!hash_password)
                throw new common_1.BadRequestException("Failed to hashing the password!");
            return this.prismaService.user.create({
                data: {
                    Username: username_super_admin,
                    Email: email_super_admin,
                    Password: hash_password,
                    Role: "SUPER_ADMIN"
                }
            });
        }
        console.log("Created Super Admin successfully!");
    }
};
BoostrapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_service_1.default])
], BoostrapService);
exports.default = BoostrapService;
//# sourceMappingURL=bootstrap.service.js.map