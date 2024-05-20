import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function PointWrapper(apiPropertyOptions: ApiPropertyOptions) {
  const options = {
    title: apiPropertyOptions.title,
    description: apiPropertyOptions.description,
    example: {
      type: 'Point',
      coordinates: [10.1, 125.6],
    },
  };

  return applyDecorators(ApiProperty(options));
}
