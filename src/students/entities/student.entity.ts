import { Agreements } from 'core/entities/agreements.entity';
import { Attendance } from 'core/entities/attendance.entity';
import { Group } from 'core/entities/group.entity';
import { Results } from 'core/entities/results.entity';
import { School } from 'core/entities/school.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity('students') //пример сущности
export class Student {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ length: 255 })
  years_with_us: string;

  @Column()
  arrival_week: number;

  @Column()
  eliminate_week: number;

  @Column({ length: 255 })
  eliminate_reason: string;

  @OneToMany(() => Results, (results) => results.student)
  results: Results[];

  @ManyToOne(() => School, (School) => School.students)
  school: School;

  @ManyToOne(() => Group, (group) => group.students)
  group: Group;

  @OneToMany(() => Agreements, (agreements) => agreements.student)
  agreements: Agreements[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendence: Attendance[];

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;
}
