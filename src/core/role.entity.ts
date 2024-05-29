import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users/entities/user.entity';

@Entity({ name: 'roles' })
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

//   @OneToMany(() => User, (user) => user.role)
//   users: User[];
}
