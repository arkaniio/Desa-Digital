import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
class TokenService {

    constructor(private jwtService: JwtService) { }

    generateToken(userData: any) {
        return this.jwtService.sign({
            id: userData.id,
            role: userData.Role,
            email: userData.Email,
            username: userData.Username
        })
    }

}

export default TokenService