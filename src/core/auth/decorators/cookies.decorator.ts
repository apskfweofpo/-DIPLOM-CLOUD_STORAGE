import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Cookies = createParamDecorator((key: string, context: ExecutionContext) => {
    const { cookies } = context.switchToHttp().getRequest()
    return key && key in cookies ? cookies[key] : cookies
})