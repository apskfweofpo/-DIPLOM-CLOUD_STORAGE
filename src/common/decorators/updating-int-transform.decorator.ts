import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function UpdatingIntTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => (value === '' ? undefined : Number(value)))(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsInt()(target, propertyKey);
  };
}
