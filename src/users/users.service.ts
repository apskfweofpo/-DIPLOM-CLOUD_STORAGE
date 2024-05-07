import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Role } from 'core/entities/role.entity';
import { LogicException } from 'exceptions/logic-exception';
import { LogicExceptionList } from 'exceptions/types/logic-exceptions.enum';
import { CreateAuthDto } from 'auth/dto/create-auth.dto';
import { StudentsService } from 'students/students.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(User)
    private readonly repository: Repository<User>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,

    private readonly studentService: StudentsService
  ) {}
  async create(createUserDto: CreateAuthDto) {
    // await this.dataSource.transaction(async (tem) => {

    // });

    const newUser = this.repository.create(createUserDto);
    const createdUser = await this.repository.save(newUser);

    const roles = [] as Role[];
    if (createUserDto.student) {
      const studentRole = await this.rolesRepository.findOne({ where: { name: 'STUDENT' } });
      console.log('studentRole', studentRole);

      roles.push(studentRole);

      this.studentService.create({ ...createUserDto.student, user_id: createdUser.id });
      createdUser.roles = [studentRole];
    }

    const createdUserWithRoles = await this.repository.save(createdUser);

    return createdUserWithRoles;
  }

  async findByOptions(where: FindOptionsWhere<User>): Promise<User> {
    return this.repository.findOne({ where, relations: {roles: true} });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
