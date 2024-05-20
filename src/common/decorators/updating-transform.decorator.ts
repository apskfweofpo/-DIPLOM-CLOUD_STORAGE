import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export function UpdatingTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => (value === '' ? undefined : value))(target, propertyKey);
    IsOptional()(target, propertyKey);
  };
}
