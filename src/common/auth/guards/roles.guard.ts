import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.get<string[]>("Role", context.getHandler())

        if (!requiredRoles) return true

        const request = context.switchToHttp()
        const user_data = request.getRequest()
        const req = user_data.user

        const result = requiredRoles.includes(req.role)

        if (!result) throw new UnauthorizedException("Failed to access this method!")

        return true

    }

}
