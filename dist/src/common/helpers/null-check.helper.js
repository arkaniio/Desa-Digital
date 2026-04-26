"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIsNullWithNumber = exports.CheckIsNull = void 0;
const CheckIsNull = (data) => {
    const update_data = {};
    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] != undefined || data[key] != null) {
                data[key] = update_data[key];
            }
        });
    }
    return update_data;
};
exports.CheckIsNull = CheckIsNull;
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