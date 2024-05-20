import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { RolesGuard } from './guards/role.guard';
import { HasRoles } from './decorators/roles.decorator';
import { ROLES } from '../users/constrants/roles.enum';
import { ApiResponseWrapper } from 'src/common/decorators/swagger.decorator';
import { Messages } from 'src/common/response_messages/messages';
import { ApiErrorWrapper } from 'src/common/decorators/swagger-error.decorator';
import { Exceptions } from 'src/common/exceptions/exceptions';
import { ExceptionMessages } from 'src/common/exceptions/exception-messages';

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
  signup(@Body() createUserDto: SignUpDto) {
    return this.authService.signUp(createUserDto);
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
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
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
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
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
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
