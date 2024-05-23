import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../projects/entities/project.entity';

export enum FileType {
  file = 'FILE',
  package = 'PACKAGE',
}

@Entity({ name: 'files' })
export class Files extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: ''})
  description: string;

  @Column({ nullable: true })
  meme_type: string;

  @Column({ nullable: true })
  path: string;

  @Column({ default: 0, nullable: true, type: 'float8' })
  size: number;

  @ManyToOne(() => Project, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'bigint'})
  project_id: number;

  @ManyToOne((type) => Files, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  parent: Files;

  @Column({ type: 'bigint', select: true, nullable: true })
  parentId: number;

  @OneToMany((type) => Files, (category) => category.parent, {
    onDelete: 'CASCADE',
  })
  children: Files[];

  @Column({
    type: 'enum',
    enum: FileType,
    default: FileType.file,
  })
  file_type: FileType;
}
