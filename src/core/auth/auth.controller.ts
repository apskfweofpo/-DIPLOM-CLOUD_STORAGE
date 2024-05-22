import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RolesGuard } from './guards/role.guard';
import { HasRoles } from './decorators/roles.decorator';
import { ROLES } from '../users/constrants/roles.enum';
import { ApiResponseWrapper } from 'src/common/decorators/swagger.decorator';
import { Messages } from 'src/common/response_messages/messages';
import { ApiErrorWrapper } from 'src/common/decorators/swagger-error.decorator';
import { Exceptions } from 'src/common/exceptions/exceptions';
import { ExceptionMessages } from 'src/common/exceptions/exception-messages';
import { Response } from 'express';
import { Cookies } from './decorators/cookies.decorator';
import * as jwt from 'jsonwebtoken';
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({
    summary: 'Регистрация пользователя',
    description:
      'Этот запрос используется для регистрации пользователя с созданием access и refresh токена',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
    },
    SignUpDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.NOT_FOUND])
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Post('signup')
  async signup(@Body() createUserDto: SignUpDto, @Res({ passthrough: true }) response: Response) {
    const data = await this.authService.signUp(createUserDto);
    response.cookie('refresh_token', data.tokens.refreshToken);
    return data
  }

  @ApiOperation({
    summary: 'Авторизация пользователя',
    description:
      'Этот запрос используется для авторизации пользователя с созданием access и refresh токена',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
    },
    AuthDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.NOT_FOUND])
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Post('signin')
  async signin(@Body() data: AuthDto, @Res({ passthrough: true }) response: Response) {
    const qwe = await this.authService.signIn(data);
    response.cookie('refresh_token', qwe.tokens.refreshToken);
    return qwe;
  }

  @ApiOperation({
    summary: 'Выход из авторизации пользователя',
    description:
      'Этот запрос используется для выхода из авторизации пользователя с использованием refresh токена',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
    },
    AuthDto,
  )
  @HasRoles(ROLES.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    this.authService.logout(req.user['sub']);
    response.clearCookie('refresh_token');
    return null;
  }

  @ApiOperation({
    summary: 'Обновление refresh токена',
    description: 'Этот запрос используется для обновления refresh токена',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
    },
    AuthDto,
  )
  // @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Cookies('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { sub } = jwt.decode(refreshToken) as { sub: string };
    const tokens = await this.authService.refreshTokens(+sub, refreshToken);
    response.cookie('refresh_token', tokens.refreshToken);
    return tokens;
  }
}
