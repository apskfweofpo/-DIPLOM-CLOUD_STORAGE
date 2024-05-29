import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DownloadLink } from './download-link.entity';
import { Files } from '../files/file.entity';
import { GenerateDownloadLinkDto } from './dto/generate-download-link.dto';
import { ExceptionMessages } from 'src/common/exceptions/exception-messages';
import { LogicException } from 'src/common/exceptions/logic.exception';
@Injectable()
export class DownloadLinkService {
  constructor(
    @InjectRepository(Files)
    private repository: Repository<Files>,

    @InjectRepository(DownloadLink)
    private downloadLinkRepository: Repository<DownloadLink>,
  ) {}

  async generateDownloadLink(dto: GenerateDownloadLinkDto) {
    const code_name = uuidv4();

    const download_link = await this.downloadLinkRepository.save({ ...dto, code_name });

    return download_link;
  }

  async downloadByLink(code_name: string) {
    const download_link = await this.downloadLinkRepository.findOne({
      where: {
        code_name,
      },
    });

    if (new Date() > new Date(download_link.expires_at)) {
      throw new LogicException(ExceptionMessages.WRONG_DIRECTION, HttpStatus.I_AM_A_TEAPOT);
    }

    const file = await this.repository.findOne({ where: { id: download_link.file_id } });

    return file;
  }
}
