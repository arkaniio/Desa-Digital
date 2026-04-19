import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ResponseError } from "src/utils/response_status";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.get<string[]>("Role", context.getHandler())

        if (!requiredRoles) return true

        const request = context.switchToHttp()
        const user = request.getRequest()

        const result = requiredRoles.includes(user.role)

        if (!result) throw new UnauthorizedException("Failed to access this method!")

        return true

    }

}