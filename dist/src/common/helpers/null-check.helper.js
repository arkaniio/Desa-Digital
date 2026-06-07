"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIsNullWithNumber = exports.CheckIsNullWitMulterAnnouncement = exports.CheckIsNullWitMulterDokumen = exports.CheckIsNullWitMulterAvatar = exports.CheckIsNullWithBooleanAndNumber = exports.CheckIsNull = void 0;
const cloudinary_helper_js_1 = require("./cloudinary_helper.js");
const CheckIsNull = (data) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key];
            }
        });
    }
    return update_data;
};
exports.CheckIsNull = CheckIsNull;
const CheckIsNullWithBooleanAndNumber = (data) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                if (typeof data[key] === "string" && data[key].trim() !== "" && !isNaN(Number(data[key]))) {
                    update_data[key] = Number(data[key]);
                }
                else if (data[key] === "true" || data[key] === "false") {
                    update_data[key] = data[key] === "true";
                }
                else {
                    update_data[key] = data[key];
                }
            }
        });
    }
    return update_data;
};
exports.CheckIsNullWithBooleanAndNumber = CheckIsNullWithBooleanAndNumber;
const CheckIsNullWitMulterAvatar = async (data, file, file_name) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key];
            }
        });
    }
    if (file) {
        const result = await (0, cloudinary_helper_js_1.BufferUpload)(file.buffer, file_name);
        update_data.Avatar = result.secure_url;
    }
    return update_data;
};
exports.CheckIsNullWitMulterAvatar = CheckIsNullWitMulterAvatar;
const CheckIsNullWitMulterDokumen = async (data, file, file_name) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key];
                if (typeof data[key] === "string" && data[key].trim() !== "" && !isNaN(Number(data[key]))) {
                    update_data[key] = Number(data[key]);
                }
            }
        });
    }
    if (file) {
        const result = await (0, cloudinary_helper_js_1.BufferUpload)(file.buffer, file_name);
        update_data.Dokumen_pengajuan = result.secure_url;
    }
    return update_data;
};
exports.CheckIsNullWitMulterDokumen = CheckIsNullWitMulterDokumen;
const CheckIsNullWitMulterAnnouncement = async (data, file, file_name) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key];
            }
        });
    }
    if (file) {
        const result = await (0, cloudinary_helper_js_1.BufferUpload)(file.buffer, file_name);
        update_data.Image = result.secure_url;
    }
    return update_data;
};
exports.CheckIsNullWitMulterAnnouncement = CheckIsNullWitMulterAnnouncement;
const CheckIsNullWithNumber = (data) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = typeof data[key] === "string" && !isNaN(Number(data[key]))
                    ? Number(data[key])
                    : data[key];
            }
        });
    }
    return update_data;
};
exports.CheckIsNullWithNumber = CheckIsNullWithNumber;
//# sourceMappingURL=null-check.helper.js.map