import { JwtService } from "@nestjs/jwt";
declare class TokenService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(userData: any): Promise<string>;
}
export default TokenService;
