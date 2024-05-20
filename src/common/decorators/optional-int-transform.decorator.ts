import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function OptionalIntTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => (['', 'null', null].includes(value) ? null : Number(value)))(
      target,
      propertyKey,
    );
    IsOptional()(target, propertyKey);
    IsInt()(target, propertyKey);
  };
}
