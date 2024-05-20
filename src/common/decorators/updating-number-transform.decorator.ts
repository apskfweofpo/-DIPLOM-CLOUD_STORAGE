import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export function UpdatingNumberTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => (value === '' ? undefined : Number(value)))(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsNumber()(target, propertyKey);
  };
}
