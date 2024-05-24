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
import { Response } from 'express';
@Injectable()
export class FilesService {
 
  constructor(
    @InjectRepository(Files)
    private repository: Repository<Files>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async downloadFile(fileId: number, res: Response) {

    const file = await this.repository.findOne({where: {id: fileId}})

    console.log('file.path',file.path)
    res.download('dist/src/static/' + file.path, file.name)
  }

  getByOptions(where?: FindOptionsWhere<Files>) {
    return this.repository.find({ where, relations: { parent: true, children: true } });
  }

  createPackage(dto: CreatePackageDto) {
    return this.repository.save({ ...dto, file_type: FileType.package });
  }

  async createFile(dto: CreateFileDto, uploadedFile: Express.Multer.File) {
    const path = await this.writeFile(uploadedFile);
    const names = uploadedFile.originalname.split('.');

    const meme_type = names[names.length - 1];
    const size = uploadedFile.size / 1000000;

    const { name, description, project_id, parent_id } = dto;

    const file = this.repository.create({
      name,
      description,
      meme_type,
      path,
      size,
      project_id,
      file_type: FileType.file,
    });

    if (parent_id) {
      const parent = await this.repository.findOne({
        where: { id: parent_id },
        relations: { parent: true },
        select: {project_id: true, id: true, size: true, parent: {id: true}}
      });
      await this.updateSize(parent, size);
      file.parent = parent;
      file.parentId = parent_id;
    }

    const project = await this.projectRepository.findOne({
      where: { id: project_id },
      relations: { files: true },
    });

    this.projectRepository.update(project.id, {size: project.size + size })
    this.repository.save(file);
  }

  async updateSize(file: Files, size_change: number) {
    const { size } = file;
    console.log('file.id',file.id)
    await this.repository.update(file.id, { size: size + size_change });
    console.log('file.id',file.id)
    if (file.parent) {
      console.log('file.parent',file.parent)
      const parent = await this.repository.findOne({
        where: { id: file.parent.id },
        relations: { parent: true },
        select: { project_id: true, id: true, size: true, parent: { id: true } },
      });
      await this.updateSize(parent, size_change);
    }
  }

  async update(id: number, dto: UpdateFileDto) {
    return this.repository.update(id, dto);
  }

  async writeFile(file: Express.Multer.File) {
    try {
      const names = file.originalname.split('.');
      console.log('names', names);
      const meme_type = names[names.length - 1];
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

    console.log('katysha',ids)

    for (const id of ids) {
      const project = await this.projectRepository.findOne({
        where: {
          files: {
            id,
          },
        },
        relations: {
          files: {
            parent: true,
          },
        },
      });

      if (!project) return null;

      // const file = await this.repository.findOne({ where: { id }, relations: {} });

      const file = await this.repository.findOne({
        where: { id },
        relations: { parent: true },
        select: { project_id: true, id: true, size: true, parent: { id: true } },
      });
      await this.updateSize(file, -file.size);

      await this.repository.delete(file.id)

      await this.projectRepository.update( project.id ,{ size: project.size - file.size });
    }

    return null;

  }
}
