import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
class TokenService {

    constructor(private jwtService: JwtService) { }

    async generateToken(userData: any) {
        return this.jwtService.sign({
            userId: userData.userId,
            role: userData.role,
            email: userData.email,
            username: userData.username
        })
    }

}

export default TokenService