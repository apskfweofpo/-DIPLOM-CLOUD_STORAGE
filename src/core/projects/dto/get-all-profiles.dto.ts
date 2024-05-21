import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString,  } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

export class GetProjectsDto extends PaginationDto {
  @ApiPropertyOptional({
    required: false,
    title: 'sort_by',
    enum: ['id', 'size', 'name'],
  })
  @IsOptional()
  sort_by: string;

  @ApiPropertyOptional({
    required: false,
    title: 'sort_direction',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  sort_direction: "ASC" | "DESC";

  @ApiPropertyOptional({
    example: 'students',
    required: false,
    title: 'username',
  })
  @IsString()
  @IsOptional()
  name: string;
}
