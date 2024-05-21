import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Project } from '../projects/entities/project.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  // exports: [ProjectsService],
  imports: [TypeOrmModule.forFeature([Files, Project])],
})
export class FilesModule {}
