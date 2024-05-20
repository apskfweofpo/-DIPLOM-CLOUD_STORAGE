import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password: string;
}
