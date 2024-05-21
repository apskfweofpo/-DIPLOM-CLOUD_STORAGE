import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../constrants/roles.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: ROLES.USER })
  role: ROLES;

  @Column({ nullable: true })
  refreshToken: string;
}
