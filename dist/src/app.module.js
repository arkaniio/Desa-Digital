"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const identity_module_1 = require("./identity/identity.module");
const rt_controller_1 = require("./rt/rt.controller");
const rt_service_1 = require("./rt/rt.service");
const rw_controller_1 = require("./rw/rw.controller");
const rw_service_1 = require("./rw/rw.service");
const announcement_controller_1 = require("./announcement/announcement.controller");
const announcement_service_1 = require("./announcement/announcement.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, identity_module_1.IdentityModule],
        controllers: [app_controller_1.AppController, rt_controller_1.RtController, rw_controller_1.RwController, announcement_controller_1.AnnouncementController],
        providers: [app_service_1.AppService, rt_service_1.RtService, rw_service_1.RwService, announcement_service_1.AnnouncementService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map