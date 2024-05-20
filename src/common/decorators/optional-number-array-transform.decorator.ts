import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export function OptionalNumberArrayTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => {
      if (value === '') {
        return undefined;
      }

      if (typeof value === 'string') {
        return value.split(',').map((i) => Number(i));
      }

      return value;
    })(target, propertyKey);
    IsOptional()(target, propertyKey);
  };
}
