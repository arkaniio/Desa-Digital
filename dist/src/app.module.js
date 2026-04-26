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
const app_controller_js_1 = require("./app.controller.js");
const app_service_js_1 = require("./app.service.js");
const prisma_module_js_1 = require("./prisma/prisma.module.js");
const auth_module_js_1 = require("./common/auth/auth.module.js");
const user_module_js_1 = require("./user/user.module.js");
const identity_module_js_1 = require("./identity/identity.module.js");
const rt_module_js_1 = require("./rt/rt.module.js");
const rw_module_js_1 = require("./rw/rw.module.js");
const announcement_module_js_1 = require("./announcement/announcement.module.js");
const village_module_js_1 = require("./village/village.module.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_js_1.PrismaModule,
            auth_module_js_1.AuthModule,
            user_module_js_1.UserModule,
            identity_module_js_1.IdentityModule,
            rt_module_js_1.RtModule,
            rw_module_js_1.RwModule,
            announcement_module_js_1.AnnouncementModule,
            village_module_js_1.VillageModule,
        ],
        controllers: [app_controller_js_1.AppController],
        providers: [app_service_js_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map