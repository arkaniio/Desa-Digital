import { IdentityService } from './identity.service';
export declare class IdentityController {
    private readonly identityService;
    constructor(identityService: IdentityService);
    registerIdentity(data: any, req: any): Promise<{
        data: {
            id: number;
            user_id: {
                id: number;
                Created_at: Date;
                Updated_at: Date;
                Full_Name: string;
                User_Id: number;
                Age: number;
                Adress: string;
            };
            full_name: string;
            age: number;
            adress: string;
        };
    }>;
    deleteIdentity(id: number): Promise<{
        id: number;
        Created_at: Date;
        Updated_at: Date;
        Full_Name: string;
        User_Id: number;
        Age: number;
        Adress: string;
    }>;
    updateIdentity(id: number): Promise<{
        id: number;
        Created_at: Date;
        Updated_at: Date;
        Full_Name: string;
        User_Id: number;
        Age: number;
        Adress: string;
    }>;
}
