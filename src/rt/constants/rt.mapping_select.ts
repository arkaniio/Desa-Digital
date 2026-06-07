export const MAPPING_SELECT_RT = {
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
}