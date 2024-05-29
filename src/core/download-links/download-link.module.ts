import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entities/project.entity';
import { DownloadLink } from './download-link.entity';
import { DownloadLinkService } from './download-link.service';
import { Files } from '../files/file.entity';
import { DownloadLinkController } from './download-link.controller';

@Module({
  controllers: [DownloadLinkController],
  providers: [DownloadLinkService],
  exports: [DownloadLinkService],
  imports: [TypeOrmModule.forFeature([DownloadLink, Files])],
})
export class DownloadLinkModule {}
