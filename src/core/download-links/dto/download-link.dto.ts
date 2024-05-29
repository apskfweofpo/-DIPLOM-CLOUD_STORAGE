import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class DownloadLinkDto {
  @ApiProperty({ example: '1', title: 'id', description: 'id' })
  id: string;

  @ApiProperty({ example: 'qokdqdpoqowm', title: 'download_link', description: 'download_link' })
  download_link: string;

  @ApiProperty({ example: '1', title: 'file_id', description: 'file_id' })
  file_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({ strict: true })
  expires_at: string;
}
