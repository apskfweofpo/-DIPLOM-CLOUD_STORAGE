import { Transform } from 'class-transformer';
import { IsInt, IsNumberString, IsOptional, ValidateIf } from 'class-validator';

export function UpdatingIntTransform() {
  return (target: any, propertyKey: string) => {
    Transform(({ value }) => {
      if (value === '') {
        return undefined;
      }
      const parsedValue = Number(value);
      return isNaN(parsedValue) ? value : parsedValue;
    })(target, propertyKey);

    IsOptional()(target, propertyKey);

    ValidateIf((_, value) => value !== '')(target, propertyKey);
    IsNumberString()(target, propertyKey);

    if (typeof target[propertyKey] === 'number') {
      IsInt()(target, propertyKey);
    }
  };
}
