import { Files } from 'src/core/files/file.entity';
import { User } from './../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0, nullable: true, type: 'float8' })
  size: number;

  @Column({ default: true })
  is_public: boolean;

  @ManyToOne(() => User, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', select: false })
  user_id: number;

  @OneToMany(() => Files, (file) => file.project)
  files: Files[];
}
