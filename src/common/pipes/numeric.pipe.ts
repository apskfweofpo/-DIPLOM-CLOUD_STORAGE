import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNumericWithPrecisionAndScale(
  precision: number,
  scale: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isNumericWithPrecisionAndScale',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [precision, scale],
      options: {
        ...validationOptions,
        message: `${validationOptions?.message} must be a numeric value with precision and scale.`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === null || value === undefined) {
            return true;
          }

          const [precision, scale] = args.constraints;

          const stringValue = String(value);
          const [integerPart, decimalPart] = stringValue.split('.');

          if (decimalPart && decimalPart.length > scale) {
            return false;
          }

          if (integerPart && integerPart.length > precision - scale) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
