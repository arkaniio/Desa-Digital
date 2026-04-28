"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIsNullWithNumber = exports.CheckIsNullWitMulter = exports.CheckIsNull = void 0;
const cloudinary_helper_1 = require("./cloudinary_helper");
const CheckIsNull = (data) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] != undefined && data[key] != null) {
                update_data[key] = data[key];
            }
        });
    }
    return update_data;
};
exports.CheckIsNull = CheckIsNull;
const CheckIsNullWitMulter = async (data, file) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key];
            }
        });
    }
    if (file) {
        const result = await (0, cloudinary_helper_1.BufferUpload)(file.buffer);
        update_data.Avatar = result.secure_url;
    }
    return update_data;
};
exports.CheckIsNullWitMulter = CheckIsNullWitMulter;
const CheckIsNullWithNumber = (data) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (typeof data[key] == "number") {
                data[key] = Number(update_data[key]);
            }
            data[key] = update_data[key];
        });
    }
    return update_data;
};
exports.CheckIsNullWithNumber = CheckIsNullWithNumber;
//# sourceMappingURL=null-check.helper.js.map