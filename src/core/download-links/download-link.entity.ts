import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from 'src/database/date.entity';
import { Files } from '../files/file.entity';

@Entity({ name: 'download_links' })
export class DownloadLink extends DateEntity {
  @Column({
    type: 'date',
  })
  expires_at: Date;

  @ManyToOne(() => Files, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'file_id' })
  file: Files;

  @PrimaryColumn()
  code_name: string;

  @Column({ type: 'bigint', select: true })
  file_id: number;
}
