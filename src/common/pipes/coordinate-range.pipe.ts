import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCoordinateInRange(
  longitude: { max: number; min: number },
  latitude: { max: number; min: number },
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCoordinateInRange',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${validationOptions?.message} longitude must have a value [-180, 180], latitude must have a value [-90, 90].`,
      },
      validator: {
        validate(value: any) {
          const coordinates = value.split(',').map((coord: string) => parseFloat(coord));

          if (coordinates[0] < longitude.min || coordinates[0] > longitude.max) {
            return false;
          }

          if (coordinates[1] < latitude.min || coordinates[1] > longitude.max) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
