import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { Project } from './entities/project.entity';
import { PageMeta } from 'src/common/pagination/page-meta';
import { PageData } from 'src/common/pagination/page-data';
import { GetProjectsDto } from './dto/get-all-profiles.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repository: Repository<Project>,
  ) {}

  async create(dto: Partial<Project>) {
    return this.repository.save(dto);
  }

  async findOneByOption(where?: FindOptionsWhere<Project>): Promise<Project[]> {
    return this.repository.find({ where });
  }

  async findAll(dto: GetProjectsDto) {
    const queryBuilder: SelectQueryBuilder<Project> =
      this.repository.createQueryBuilder('projects');

    const page = dto.page;
    const perPage = dto.per_page;

    // this.filterByField(queryBuilder, 'nodes.id', dto.node_ids);

    if (dto.sort_by) {
      queryBuilder.orderBy(`projects.${dto.sort_by}`, dto.sort_direction);
    }

    if (dto.name) {
      queryBuilder.where(`projects.name LIKE '%${dto.name}%'`);
    }

    if (perPage !== -1) {
      queryBuilder.setFindOptions({ skip: (page - 1) * perPage, take: perPage });
    }

    const total = await queryBuilder.getCount();
    const nodeMobilityOptions = await queryBuilder.getMany();

    const pageMeta = PageMeta.generateMeta(total, perPage, page);
    const pageData = new PageData(nodeMobilityOptions, pageMeta);

    return pageData;
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.repository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
