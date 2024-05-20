import { Transform } from 'class-transformer';
import { LogicException } from '../exceptions/logic.exception';
import { ExceptionMessages } from '../exceptions/exception-messages';
import { HttpStatus } from '@nestjs/common';

export function JsonTransform() {
  return Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch (error) {
      throw new LogicException(ExceptionMessages.INVALID_JSON, HttpStatus.BAD_REQUEST);
    }
  });
}
