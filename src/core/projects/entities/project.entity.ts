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

  @Column('float', { default: 0, nullable: true })
  size: number;

  @Column('float', { default: 1000, nullable: true })
  max_size: number;

  @Column({ default: true })
  is_public: boolean;

  @ManyToOne(() => User, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', select: true })
  user_id: number;

  @OneToMany(() => Files, (file) => file.project)
  files: Files[];
}
