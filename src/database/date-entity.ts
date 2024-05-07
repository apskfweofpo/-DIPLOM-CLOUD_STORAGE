import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateEntity extends BaseEntity { //базовая сущность
  @CreateDateColumn({
    name: 'created_at',
    type: 'time with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'time with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'time with time zone',
    nullable: true,
    select: false,
  })
  deletedAt: Date;
}
