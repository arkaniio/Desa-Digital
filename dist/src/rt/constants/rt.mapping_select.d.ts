export declare const MAPPING_SELECT_RT: {
    Number: boolean;
    Village: {
        select: {
            Name: boolean;
            Address: boolean;
            Leader_Village: {
                select: {
                    Username: boolean;
                    Address: boolean;
                    Avatar: boolean;
                };
            };
        };
    };
    Leader: {
        select: {
            Username: boolean;
            Address: boolean;
            Avatar: boolean;
        };
    };
};
