import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

        const requestUser = ctx.switchToHttp().getRequest()
        const user = requestUser.user

        if (!user) return null

        return data ? user[data] : user

    }
)
