import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export function UpdatingBoolTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => (value === '' ? undefined : value === 'true'))(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsBoolean()(target, propertyKey);
  };
}
