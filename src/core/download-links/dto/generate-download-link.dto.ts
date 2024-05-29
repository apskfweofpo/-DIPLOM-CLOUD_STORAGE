import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class GenerateDownloadLinkDto {
  @ApiProperty({ example: '1', title: 'file_id', description: 'file_id' })
  file_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({ strict: true })
  expires_at: string;
}
