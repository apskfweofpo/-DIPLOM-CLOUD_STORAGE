import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Page } from './page.class';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(Page),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(Page) },
          {
            properties: {
              data: {
                type: 'object',
                properties: {
                  content: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
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
