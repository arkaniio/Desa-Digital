import { IdentityService } from './identity.service';
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    registerIdentity(data: any, req: any): Promise<{
        data: {
            id: number;
            user_id: {
                Full_Name: string;
                Age: number;
                Adress: string;
                Created_at: Date;
                Updated_at: Date;
                id: number;
                User_Id: number;
            };
            full_name: string;
            age: number;
            adress: string;
        };
    } | undefined>;
    deleteIdentity(id: number): Promise<{
        Full_Name: string;
        Age: number;
        Adress: string;
        Created_at: Date;
        Updated_at: Date;
        id: number;
        User_Id: number;
    }>;
    updateIdentity(id: number): Promise<{
        Full_Name: string;
        Age: number;
        Adress: string;
        Created_at: Date;
        Updated_at: Date;
        id: number;
        User_Id: number;
    }>;
}
