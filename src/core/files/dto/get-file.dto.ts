import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetFileDto {
  @ApiPropertyOptional({
    title: 'ids',
    default: '1,2,3',
  })
  parentId: number;
}
