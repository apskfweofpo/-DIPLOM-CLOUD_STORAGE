import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export function UpdatingStrTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => (value === '' ? undefined : value))(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsString()(target, propertyKey);
  };
}
