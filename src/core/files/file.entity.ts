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

  @Column({ type: 'bigint', select: false })
  project_id: number;

  @ManyToOne((type) => Files, (category) => category.children)
  parent: Files;

  @Column({ type: 'bigint', select: false, nullable: true })
  parentId: number;

  @OneToMany((type) => Files, (category) => category.parent)
  children: Files[];

  @Column({
    type: 'enum',
    enum: FileType,
    default: FileType.file,
  })
  file_type: FileType;

  updateSize() {
    if (this.children) {
      let size = 0;
      for (const file of this.children) {
        if (file.file_type == FileType.package) {
          file.updateSize();
        }
        size += file.size;
      }
      this.size = size;
    }
  }
}
