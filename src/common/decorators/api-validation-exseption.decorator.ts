import { ApiResponse } from '@nestjs/swagger';

export const ApiValidationException = () => {
  return ApiResponse({
    status: 400,
    schema: {
      example: {
        data: {},
        meta: 'Неверный формат параметра paramName;',
      },
    },
  });
};
