import { Column } from 'typeorm';
import { DateEntity } from './date.entity';

export abstract class DictionaryEntity extends DateEntity {
  @Column({ type: 'bigint', unique: true })
  name: string;
}
