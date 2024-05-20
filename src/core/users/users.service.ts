import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUsersDto } from './dto/get-users.dto';
import { PageMeta } from 'src/common/pagination/page-meta';
import { PageData } from 'src/common/pagination/page-data';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async findByOption(where: FindOptionsWhere<User>): Promise<User> {
    return this.repository.findOne({ where });
  }
  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findAll(dto: GetUsersDto) {
    const queryBuilder: SelectQueryBuilder<User> = this.repository.createQueryBuilder('users');

    const page = dto.page;
    const perPage = dto.per_page;

    // this.filterByField(queryBuilder, 'nodes.id', dto.node_ids);

    if (dto.sort_by) {
      queryBuilder.orderBy(`users.${dto.sort_by}`, dto.sort_direction);
    }

    if (dto.username) {
      queryBuilder.where(`users.username LIKE '%${dto.username}%'`);
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

  async update(id: number, updateUserDto: Partial<User>) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
