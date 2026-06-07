"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAPPING_SELECT_RW = void 0;
exports.MAPPING_SELECT_RW = {
    Name: true,
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
//# sourceMappingURL=rw.mapping_select.js.map