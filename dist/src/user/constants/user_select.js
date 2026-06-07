"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECT_USER_DATA = void 0;
exports.SELECT_USER_DATA = {
    id: true,
    Username: true,
    Email: true,
    Address: true,
    Role: true,
    Avatar: true,
    VillageId: true,
    Created_at: true,
    Updated_at: true,
    Village: {
        select: {
            Name: true,
            Address: true
        }
    },
    Rt: {
        select: {
            Number: true,
            RwId: true,
            Rw: {
                select: {
                    Name: true,
                    Village: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    },
                    Leader: {
                        select: {
                            Username: true,
                            Address: true
                        }
                    }
                }
            }
        }
    },
    LedVillages: {
        select: {
            Leader_Village: {
                select: {
                    Username: true,
                    Address: true
                }
            }
        }
    },
    LedRws: {
        select: {
            Name: true,
            Village: {
                select: {
                    Name: true,
                    Address: true
                }
            },
            Leader: {
                select: {
                    Username: true,
                    Address: true
                }
            }
        }
    },
    LedRts: {
        select: {
            Number: true,
            RwId: true,
            Rw: {
                select: {
                    Name: true,
                    Village: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    },
                    Leader: {
                        select: {
                            Username: true,
                            Address: true
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=user_select.js.map