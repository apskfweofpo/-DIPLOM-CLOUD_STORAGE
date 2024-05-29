import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../constrants/roles.enum';
import { Project } from 'src/core/projects/entities/project.entity';
import { Roles } from 'src/core/role.entity';

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

  @Column({default: false})
  is_ban: boolean;

  @Column({default: null, nullable: true})
  icon_path: string;

  @Column({ default: ROLES.USER })
  role: ROLES;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  // @ManyToOne(() => Roles, {
  //   onUpdate: 'RESTRICT',
  //   onDelete: 'RESTRICT',
  // })
  // @JoinColumn({ name: 'role_id' })
  // role: Roles;

  // @Column({ type: 'bigint', select: true, nullable: true })
  // role_id: number;
}
