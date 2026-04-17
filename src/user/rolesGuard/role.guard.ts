import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.get<string[]>("roles", context.getHandler())

        if (!requiredRoles) return true

        const request = context.switchToHttp()
        const user = request.getRequest()

        const result = requiredRoles.includes(user.role)
        if (result) throw new ForbiddenException("Failed to access this method!")

        return result

    }

}