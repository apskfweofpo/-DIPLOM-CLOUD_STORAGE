import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { Exceptions } from 'exceptions/exception';
import { LogicException } from 'exceptions/logic-exception';
import { ValidationException } from 'exceptions/validation.exception';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  async catch(
    exception: unknown & { stack: string; message: string; error: string },
    host: ArgumentsHost
  ) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responseBody: { data: object; meta: string } = {
      data: {},
      meta: undefined,
    };

    if (exception instanceof LogicException) {
      const { httpStatusCode, message } = Exceptions[(exception as LogicException).error];
      responseBody.meta = message;
      response.status(httpStatusCode).json(responseBody);
      return;
    }

    const { code, message } = this.getExceptionBody(exception);
    responseBody.meta = message;
    response.status(code).json(responseBody);
    return;
  }

  getExceptionBody(exception: unknown): {
    message: string;
    code: number;
  } {
    const response: { message: string; code: number } = {
      message: 'Internal server error',
      code: 500,
    };

    if (exception instanceof ValidationException) {
      const errors = (exception as ValidationException).errors;
      response.code = 400;
      response.message = Object.keys(errors)
        .map((error) => `Неверный формат параметра ${error}`)
        .join('; ');

      return response;
    }
    if (exception instanceof HttpException) {
      response.message = (exception as HttpException).message;
      response.code = (exception as HttpException).getStatus();
      return response;
    }
    if (exception instanceof NotFoundException) {
      response.message = (exception as NotFoundException).message;
      response.code = 404;
      return response;
    }
    return response;
  }
}
