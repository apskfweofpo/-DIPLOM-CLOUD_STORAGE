import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiResponseCustom } from 'common/decorators/api-response.decorator';
import { ApiException } from 'common/decorators/api-exception.decorator';
import { LogicExceptionList } from 'exceptions/types/logic-exceptions.enum';
import { User } from './entities/user.entity';
import { AccessTokenGuard } from 'common/guards/accessToken.guard';
import { Roles } from 'auth/decorators/roles.decorator';
import { Role } from 'auth/enums/role.enum';
import { RolesGuard } from 'common/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
@ApiExtraModels(CreateUserDto)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Student)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
