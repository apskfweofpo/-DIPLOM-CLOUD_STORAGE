import {
  AfterInsert,
  BaseEntity,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date = new Date();

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date = new Date();

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = new Date();
  }

  @AfterInsert()
  transformId() {
    this.id = typeof this.id === 'string' ? parseInt(this.id, 10) : this.id;
  }
}
