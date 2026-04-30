import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

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

export class RolesGuardDouble implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const required_roles = this.reflector.get<string[]>("Role", context.getHandler())

        if (!required_roles) return true

        const get_http_data = context.switchToHttp()

        const request = get_http_data.getRequest()

        const data_user_role = request.user.role

        if (data_user_role != "RW" && data_user_role != "RT") throw new UnauthorizedException("Failed to access this method!")

        const result = required_roles.includes(data_user_role)

        if (!result) throw new UnauthorizedException("Failed to access this method!")

        return true
    }

}
