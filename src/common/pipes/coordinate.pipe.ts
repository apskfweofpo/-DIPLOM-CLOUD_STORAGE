import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCoordinate(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCoordinate',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${validationOptions?.message} must be a coordinate in format: 'longitude,latitude'.`,
      },
      validator: {
        validate(value: string) {
          if (!value.match(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
