import { Transform } from 'class-transformer';

export function TransformOptionalNumber() {
  return Transform(({ value }) => {
    if (value === 'null' || value === null) {
      return null;
    }
    if (value === '' || value === undefined) {
      return undefined;
    }
    return Number(value);
  });
}
