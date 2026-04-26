"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = exports.ResponseSuccess = void 0;
const common_1 = require("@nestjs/common");
const ResponseSuccess = (data, status_code, message, success) => {
    return {
        status_code: status_code,
        message: message,
        data: data,
        success: success
    };
};
exports.ResponseSuccess = ResponseSuccess;
const ResponseError = (data, status_code, message, success) => {
    throw new common_1.BadRequestException({
        status_code: status_code,
        message: message,
        data: data,
        success: success
    });
};
exports.ResponseError = ResponseError;
//# sourceMappingURL=response.helper.js.map