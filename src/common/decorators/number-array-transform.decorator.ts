import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export function NumberArrayTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) =>
      typeof value === 'string' ? value.split(',').map((i) => Number(i)) : value,
    )(target, propertyKey);
    IsOptional()(target, propertyKey);
  };
}
