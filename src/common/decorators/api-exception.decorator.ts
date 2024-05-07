import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Exceptions } from 'exceptions/exception';
import { LogicExceptionList } from 'exceptions/types/logic-exceptions.enum';

export const ApiException = (exceptions: LogicExceptionList[]) => {
  const matchedByCode = exceptions.reduce((prev, curr) => {
    const exception = Exceptions[curr];
    const code = exception.httpStatusCode;
    if (!prev[code]) prev[code] = [];
    prev[code].push(exception);
    return prev;
  }, {});

  const decorators = Object.keys(matchedByCode).map((code) => {
    return ApiResponse({
      status: parseInt(code),
      content: {
        'application/json': {
          examples: matchedByCode[code].reduce((acc, exception, index) => {
            acc[exceptions[index]] = {
              value: {
                data: {},
                meta: exception.message,
              },
            };
            return acc;
          }, {}),
        },
      },
    });
  });

  return applyDecorators(...decorators);
};
