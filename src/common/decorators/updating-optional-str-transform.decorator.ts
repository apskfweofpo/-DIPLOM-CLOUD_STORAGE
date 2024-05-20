import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export function UpdatingOptionalStrTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => {
      if (value === 'null' || value === null) {
        return null;
      }
      if (value === '') {
        return undefined;
      }
      return value;
    })(target, propertyKey);
    IsOptional()(target, propertyKey);
    IsString()(target, propertyKey);
  };
}
