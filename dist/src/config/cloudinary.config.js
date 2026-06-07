"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureCloudinanry = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
const ConfigureCloudinanry = () => {
    (0, dotenv_1.configDotenv)();
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    return cloudinary_1.v2;
};
exports.ConfigureCloudinanry = ConfigureCloudinanry;
//# sourceMappingURL=cloudinary.config.js.map