import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

export class GetUsersDto extends PaginationDto {
  // @ApiPropertyOptional({
  //   example: '1,2,3',
  //   required: false,
  //   title: 'user_ids',
  // })
  // @IsString()
  // @IsOptional()
  // user_ids: string;

  @ApiPropertyOptional({
    example: 'students',
    required: false,
    title: 'username',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiPropertyOptional({
    required: false,
    title: 'sort_by',
    enum: ['id', 'email', 'username'],
  })
  @IsOptional()
  sort_by: string;

  @ApiPropertyOptional({
    required: false,
    title: 'sort_direction',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  sort_direction: 'ASC' | 'DESC';
}
