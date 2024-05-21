import { Controller, Get, Body, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from 'src/common/decorators/swagger.decorator';
import { Messages } from 'src/common/response_messages/messages';
import { UserDto } from './dto/user.dto';
import { ApiErrorWrapper } from 'src/common/decorators/swagger-error.decorator';
import { Exceptions } from 'src/common/exceptions/exceptions';
import { ExceptionMessages } from 'src/common/exceptions/exception-messages';
import { PageData } from 'src/common/pagination/page-data';
import { GetUsersDto } from './dto/get-users.dto';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: '[ADMIN]Получить всех пользователей',
    description: 'Этот запрос используется для получения всех пользователей',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    UserDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get()
  findAll(@Query() dto: GetUsersDto): Promise<PageData<UserDto>> {
    return this.usersService.findAll(dto);
  }

  @ApiOperation({
    summary: '[ADMIN]Получить одного пользователя',
    description: 'Этот запрос используется для получения пользователя',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    UserDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Получить профиль',
    description: 'Этот запрос используется для получения профиля',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    UserDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get('profile')
  getProfile(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.usersService.findOne(+userId);
  }

  @ApiOperation({
    summary: 'Редактировать профиль',
    description: 'Этот запрос используется для редактирования профиля',
  })
  @Put('profile')
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    UserDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user['sub'];
    return this.usersService.update(+userId, updateUserDto);
  }

  @ApiOperation({
    summary: '[ADMIN]Редактировать пользователя',
    description: 'Этот запрос используется для редактирования пользователя',
  })
  @Put(':id')
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    UserDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: '[ADMIN]Удалить пользователя',
    description: 'Этот запрос используется для удаления пользователя',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
