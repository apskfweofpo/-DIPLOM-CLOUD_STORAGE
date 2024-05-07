import { ValidationOptions, ValidateIf, IsOptional as IsOptionalValidator } from 'class-validator';

export function IsOptional(nullable = true, validationOptions?: ValidationOptions) {
  if (nullable) {
    return IsOptionalValidator(validationOptions);
  }

  return ValidateIf((ob: any, v: any) => {
    return v !== undefined;
  }, validationOptions);
}
