import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from 'src/common/decorators/swagger.decorator';
import { Messages } from 'src/common/response_messages/messages';
import { ProjectDto } from './dto/project.dto';
import { ApiErrorWrapper } from 'src/common/decorators/swagger-error.decorator';
import { Exceptions } from 'src/common/exceptions/exceptions';
import { ExceptionMessages } from 'src/common/exceptions/exception-messages';
import { GetProjectsDto } from './dto/get-all-profiles.dto';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Создать проект',
    description: 'Этот запрос используется для создания проекта',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    CreateProjectDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: Request) {
    return this.projectsService.create({ ...createProjectDto, user_id: req.user['sub'] });
  }

  @ApiOperation({
    summary: 'Получить все проекты',
    description: 'Этот запрос используется для получения всех проектов',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    ProjectDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get()
  findAll(@Query() dto: GetProjectsDto) {
    return this.projectsService.findAll(dto);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Получить все свои проекты',
    description: 'Этот запрос используется для получения всех своих проектов',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    ProjectDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get('my')
  findMyAll(@Req() req: Request) {
    const user_id = req.user['sub'];
    return this.projectsService.findOneByOption({ user_id });
  }

  @ApiOperation({
    summary: 'Получить проект',
    description: 'Этот запрос используется для получения проекта',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
      withMeta: true,
    },
    ProjectDto,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Редактировать проект',
    description: 'Этот запрос используется для редактирования проекта',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @ApiOperation({
    summary: 'Удалить проект',
    description: 'Этот запрос используется для удаления проект',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
