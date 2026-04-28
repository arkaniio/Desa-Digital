"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterException = void 0;
const common_1 = require("@nestjs/common");
let FilterException = class FilterException {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request_ctx = ctx.getRequest();
        const response_ctx = ctx.getResponse();
        const response_exception = exception.getResponse();
        const status_exception = exception.getStatus();
        return response_ctx.status(status_exception).json({
            message: "not success!",
            data: response_exception,
            statusCode: response_ctx.statusCode,
            meta: {
                path_url: request_ctx.url,
                timestamp: new Date().toISOString()
            }
        });
    }
};
exports.FilterException = FilterException;
exports.FilterException = FilterException = __decorate([
    (0, common_1.Catch)()
], FilterException);
//# sourceMappingURL=response_error.interceptor.js.map