import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

type ApiResponseOptionsType = {
  withContent?: boolean;
  description?: string;
};
export const ApiResponseCustom = (status: number, type?: any, option?: ApiResponseOptionsType) => {
  const data = type
    ? option?.withContent
      ? {
          type: 'object',
          properties: {
            content: {
              type: 'array',
              items: { $ref: getSchemaPath(type) },
            },
          },
        }
      : {
          $ref: getSchemaPath(type),
        }
    : {
        type: 'object',
      };

  return applyDecorators(
    ApiResponse({
      status,
      description: option?.description,
      schema: {
        allOf: [
          {
            properties: {
              data,
              meta: {
                type: 'string',
                nullable: true,
              },
            },
          },
        ],
      },
    })
  );
};
