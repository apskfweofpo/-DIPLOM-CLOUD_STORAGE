import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> { 
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'param') {
      return value;
    }

    const obj = plainToInstance(metadata.metatype!, value, {
      exposeUnsetFields: false,
    });

    if (metadata.type === 'query') {
      if (typeof value !== 'object') return value;
    }

    const errors = await validate(obj, {
      forbidUnknownValues: false,
      stopAtFirstError: false,
      whitelist: true,
      validateNested: true,
    });

    if (errors.length) {
      const printError = {};

      errors.forEach((err) => {
        const stack = [{ error: err, propertyPath: err.property }];

        while (stack.length > 0) {
          const { error, propertyPath } = stack.pop();

          if (error.constraints) {
            printError[`${error.property} {${propertyPath}}`] = Object.values(error.constraints);
          }

          if (error.children && error.children.length > 0) {
            for (let i = error.children.length - 1; i >= 0; i--) {
              const childError = error.children[i];
              const nestedPropertyPath = `${propertyPath}.${childError.property}`;
              stack.push({ error: childError, propertyPath: nestedPropertyPath });
            }
          }
        }
      });

      throw new ValidationException(printError);
    }

    return obj;
  }

  getPropertyPath(error, parentPath = ''): string {
    const path = error.property
      ? parentPath
        ? `${parentPath}.${error.property}`
        : error.property
      : parentPath;
    if (error.children && error.children.length > 0) {
      const childPath = this.getPropertyPath(error.children[0], path);
      return childPath;
    }
    return path;
  }
}
