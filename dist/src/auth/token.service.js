"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    generateToken(userData) {
        return this.jwtService.sign({
            id: userData.id,
            role: userData.Role,
            email: userData.Email,
            username: userData.Username
        });
    }
}
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map