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
exports.BootstrapModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../../prisma/prisma.module");
const password_module_1 = require("../password/password.module");
const bootstrap_service_1 = __importDefault(require("./bootstrap.service"));
let BootstrapModule = class BootstrapModule {
};
exports.BootstrapModule = BootstrapModule;
exports.BootstrapModule = BootstrapModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, password_module_1.PasswordModule],
        providers: [bootstrap_service_1.default]
    })
], BootstrapModule);
//# sourceMappingURL=bootstrap.module.js.map