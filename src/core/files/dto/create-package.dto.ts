import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ example: 'package', title: 'name', description: 'name' })
  name: string;

  @ApiProperty({ example: '1', title: 'project_id', description: 'project_id' })
  project_id: number;

  @ApiPropertyOptional({ example: '1', title: 'parent_id', description: 'parent_id' })
  @IsOptional()
  parent_id?: number;
}
