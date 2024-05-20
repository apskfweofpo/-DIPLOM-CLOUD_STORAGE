import { User } from './../../users/entities/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0, nullable: true })
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
}
