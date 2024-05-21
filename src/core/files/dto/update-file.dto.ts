import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateFileDto {
  @ApiPropertyOptional({ example: 'cat', title: 'name', description: 'name' })
  @IsOptional()
  name: string;
}
