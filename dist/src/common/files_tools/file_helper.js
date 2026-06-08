"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptorTools = void 0;
const platform_express_1 = require("@nestjs/platform-express");
exports.FileInterceptorTools = (0, platform_express_1.FileInterceptor)("file", {
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes("image")) {
            return cb(new Error("Failed to detect an image has been invalid!"), false);
        }
        return cb(null, true);
    }
});
//# sourceMappingURL=file_helper.js.map