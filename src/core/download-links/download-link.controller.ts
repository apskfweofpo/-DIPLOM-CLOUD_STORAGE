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
import { DownloadLinkService } from './download-link.service';
import { GenerateDownloadLinkDto } from './dto/generate-download-link.dto';
import { ApiResponseWrapper } from 'src/common/decorators/swagger.decorator';
import { Messages } from 'src/common/response_messages/messages';
import { Files } from '../files/file.entity';

@ApiTags('Download_Link')
@Controller('download_link')
export class DownloadLinkController {
  constructor(private readonly downloadLinkService: DownloadLinkService) {}

  @ApiOperation({
    summary: 'Получить файл по ссылке',
    description: 'Этот запрос используется для получения файла по ссылке',
  })
  @ApiResponseWrapper(
    {
      options: { status: 200, description: Messages.SUCCESSFUL_OPERATION },
    },
    Files,
  )
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Get(':code_name')
  async getByCodeName(@Param('code_name') code_name: string) {
    return this.downloadLinkService.downloadByLink(code_name);
  }

  @ApiOperation({
    summary: 'Создать ссылку для файла',
    description: 'Этот запрос используется для создания ссылки для файла',
  })
  @ApiResponse({ status: 201, description: 'Файл успешно создан' })
  @ApiErrorWrapper(Exceptions[ExceptionMessages.ERROR_RESPONSE])
  @Post()
  async createFile(@Body() dto: GenerateDownloadLinkDto) {
    return this.downloadLinkService.generateDownloadLink(dto);
  }
}
