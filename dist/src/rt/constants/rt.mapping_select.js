"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAPPING_SELECT_RT = void 0;
exports.MAPPING_SELECT_RT = {
    Number: true,
    Village: {
        select: {
            Name: true,
            Address: true,
            Leader_Village: {
                select: {
                    Username: true,
                    Address: true,
                    Avatar: true
                }
            }
        }
    },
    Leader: {
        select: {
            Username: true,
            Address: true,
            Avatar: true
        }
    }
};
//# sourceMappingURL=rt.mapping_select.js.map