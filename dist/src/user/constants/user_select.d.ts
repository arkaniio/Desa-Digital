export declare const SELECT_USER_DATA: {
    id: boolean;
    Username: boolean;
    Email: boolean;
    Role: boolean;
    Avatar: boolean;
    VillageId: boolean;
    Created_at: boolean;
    Updated_at: boolean;
    Village: {
        select: {
            Name: boolean;
            Address: boolean;
        };
    };
    Rt: {
        select: {
            Number: boolean;
            RwId: boolean;
            Rw: {
                select: {
                    Name: boolean;
                    Village: {
                        select: {
                            Name: boolean;
                            Address: boolean;
                        };
                    };
                    Leader: {
                        select: {
                            Username: boolean;
                        };
                    };
                };
            };
        };
    };
    LedVillages: {
        select: {
            Leader_Village: {
                select: {
                    Username: boolean;
                };
            };
        };
    };
    LedRws: {
        select: {
            Name: boolean;
            Village: {
                select: {
                    Name: boolean;
                    Address: boolean;
                };
            };
            Leader: {
                select: {
                    Username: boolean;
                };
            };
        };
    };
    LedRts: {
        select: {
            Number: boolean;
            RwId: boolean;
            Rw: {
                select: {
                    Name: boolean;
                    Village: {
                        select: {
                            Name: boolean;
                            Address: boolean;
                        };
                    };
                    Leader: {
                        select: {
                            Username: boolean;
                        };
                    };
                };
            };
        };
    };
};
