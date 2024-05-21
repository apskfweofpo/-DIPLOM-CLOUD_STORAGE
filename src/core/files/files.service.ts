import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileType, Files } from './file.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { Project } from '../projects/entities/project.entity';
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private repository: Repository<Files>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  getByOptions(where?: FindOptionsWhere<Files>) {
    return this.repository.find({ where, relations: { parent: true, children: true } });
  }

  createPackage(dto: CreatePackageDto) {
    return this.repository.save({ ...dto, file_type: FileType.package });
  }

  async createFile(dto: CreateFileDto, uploadedFile: Express.Multer.File) {
    const path = await this.writeFile(uploadedFile);
    const meme_type = uploadedFile.originalname.split('.')[1];
    const size = uploadedFile.size / 1000000;

    const { name, project_id, parent_id } = dto;

    const file = this.repository.create({
      name,
      meme_type,
      path,
      size,
      project_id,
      file_type: FileType.file,
    });

    if (parent_id) {
      file.parent = await this.repository.findOne({ where: { id: parent_id } });
      file.parentId = parent_id;
    }

    const project = await this.projectRepository.findOne({ where: { id: project_id } });
    project.updateSize();
    return this.repository.save(file);
  }

  async update(id: number, dto: UpdateFileDto) {
    return this.repository.update(id, dto);
  }

  async writeFile(file: Express.Multer.File) {
    try {
      const meme_type = file.originalname.split('.')[1];
      const fileName = uuidv4() + '.' + meme_type;
      const filePath = path.resolve(__dirname, '..', '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      console.log('filePath', filePath);
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(raw_ids: string) {
    const ids: number[] = raw_ids.split(',').map((id) => Number(id));

    const project = await this.projectRepository.findOne({
      where: {
        files: {
          id: ids[0],
        },
      },
    });
    project.updateSize();

    return this.repository.delete(ids);
  }
}
