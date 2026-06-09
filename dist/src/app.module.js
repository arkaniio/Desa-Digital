"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const rt_module_1 = require("./rt/rt.module");
const rw_module_1 = require("./rw/rw.module");
const announcement_module_1 = require("./announcement/announcement.module");
const village_module_1 = require("./village/village.module");
const submissions_module_1 = require("./submissions/submissions.module");
const bootstrap_service_1 = __importDefault(require("./common/services/bootstrap/bootstrap.service"));
const bootstrap_module_1 = require("./common/services/bootstrap/bootstrap.module");
const password_module_1 = require("./common/services/password/password.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            bootstrap_module_1.BootstrapModule,
            password_module_1.PasswordModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            rt_module_1.RtModule,
            rw_module_1.RwModule,
            announcement_module_1.AnnouncementModule,
            village_module_1.VillageModule,
            submissions_module_1.SubmissionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [bootstrap_service_1.default, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map