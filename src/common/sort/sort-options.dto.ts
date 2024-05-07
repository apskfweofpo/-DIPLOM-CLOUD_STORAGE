import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SortDirectionList } from './sort-direction-list';

export class SortOptionsDto {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly sortBy: string;

  @ApiPropertyOptional({
    default: 'acs',
    enum: Object.keys(SortDirectionList),
  })
  @IsString()
  @IsOptional()
  readonly sortDirection: SortDirectionList = SortDirectionList.asc;
}
