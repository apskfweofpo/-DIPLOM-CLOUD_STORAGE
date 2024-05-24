import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorWrapper } from 'src/common/decorators/swagger-error.decorator';
import { Exceptions } from 'src/common/exceptions/exceptions';
import { ExceptionMessages } from 'src/common/exceptions/exception-messages';
import { FilesService } from './files.service';
import { GetFileDto } from './dto/get-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateFileDto } from './dto/update-file.dto';
import { DeleteFilesDto } from './dto/delete-files.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { Response } from 'express';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({
    summary: 'Получить все файлы проекта',
    description: 'Этот запрос используется для получения всех файлов проекта',
  })
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get(':projectId')
  async getAllFiles(@Param('projectId') project_id: number, @Query() dto: GetFileDto) {
    return this.filesService.getByOptions({ project_id, parentId: dto.parentId });
  }

  @ApiOperation({
    summary: 'Скачать файл',
    description: 'Этот запрос используется для скачивания файла',
  })
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get('download/:fileId')
  async download(@Param('fileId') fileId: number, @Res() res: Response) {
     await this.filesService.downloadFile(fileId, res);
     return;
  }

  @ApiOperation({
    summary: 'Создать файл',
    description: 'Этот запрос используется для создания файла',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Файл успешно создан' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Post('file')
  async createFile(@Body() dto: CreateFileDto, @UploadedFile() file: Express.Multer.File) {
    return this.filesService.createFile(dto, file);
  }

  @ApiOperation({
    summary: 'Создать папку',
    description: 'Этот запрос используется для создания папки',
  })
  @ApiResponse({ status: 201, description: 'Папка успешно создана' })
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Post('package')
  async createPackage(@Body() dto: CreatePackageDto) {
    return this.filesService.createPackage(dto);
  }

  @ApiOperation({
    summary: 'Редактировать проект',
    description: 'Этот запрос используется для редактирования проекта',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateFileDto) {
    return this.filesService.update(+id, updateProjectDto);
  }

  @ApiOperation({
    summary: 'Удалить файлы',
    description: 'Этот запрос используется для удаления файлов',
  })
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Delete()
  remove(@Query() dto: DeleteFilesDto) {
    return this.filesService.remove(dto.ids);
  }
}
