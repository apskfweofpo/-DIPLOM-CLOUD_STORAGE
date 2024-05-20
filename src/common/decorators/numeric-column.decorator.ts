import { applyDecorators } from '@nestjs/common';
import { Column } from 'typeorm';

export function NumericColumn(precision: number, scale: number) {
  return applyDecorators(
    Column({
      type: 'numeric',
      precision,
      scale,
      transformer: {
        to(value) {
          return value;
        },
        from(value) {
          return parseFloat(value);
        },
      },
    }),
  );
}
