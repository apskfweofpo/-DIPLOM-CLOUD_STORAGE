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
    const names = uploadedFile.originalname.split('.')

    const meme_type =  names[names.length - 1]
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

    const project = await this.projectRepository.findOne({
      where: { id: project_id },
      relations: { files: true },
    });

    let project_size = 0;
    project.files?.forEach(async (file) => {
      if (file.children) {
        project_size += await this.updateSize(file);
      } else {
        project_size += file.size;
      }
    });
    console.log('project_size', project_size);
    project.size = project_size;
    this.projectRepository.save(project);
    return this.repository.save(file);
  }

  async update(id: number, dto: UpdateFileDto) {
    return this.repository.update(id, dto);
  }

  async writeFile(file: Express.Multer.File) {
    try {
      const names = file.originalname.split('.')
      console.log('names',names)
      const meme_type = names[names.length - 1]
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
      relations: {
        files: {
          children: true
        },
      },
    });

    if (!project) return null;
    //  await this.repository.delete(ids);
    let project_size = 0;

    if (project.files) {
      for (const file of project.files) {
        if (file.children) {
          project_size += await this.updateSize(file);
        } else {
          project_size += file.size;
        }
      }
    }
    // console.log('project_size', project_size);
    project.size = project_size;
    console.log('project',project)
    // await this.projectRepository.save(project);
    return console.log('project_size', project_size);

  }

  async updateSize(file: Files) {
    if (file.children) {
      let size = 0;
      for (const filik of file.children) {
        if (filik.children) {
          this.updateSize(filik)
        }
        size += filik.size;
      }
      file.size = size;
      await this.repository.save(file);
      return size;
    }
    return file.size;
  }
}
