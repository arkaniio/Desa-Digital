import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {

        const requestUser = ctx.switchToHttp().getRequest()
        const user = requestUser.user

        if (user.userId == undefined || user.userId == null) return null

        return Number(user.userId)

    }
)
