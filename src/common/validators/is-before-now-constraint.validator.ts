import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint()
export class IsBeforeNowValidator implements ValidatorConstraintInterface {
  validate(date: string) {
    return new Date(date) < new Date();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} can not after now.`;
  }
}

export function IsBeforeNow(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBeforeNowValidator,
    });
  };
}
