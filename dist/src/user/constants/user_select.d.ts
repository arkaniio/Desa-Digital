export declare const SELECT_USER_DATA: {
    id: boolean;
    Username: boolean;
    Email: boolean;
    Address: boolean;
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
                            Address: boolean;
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
                    Address: boolean;
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
                    Address: boolean;
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
                            Address: boolean;
                        };
                    };
                };
            };
        };
    };
};
