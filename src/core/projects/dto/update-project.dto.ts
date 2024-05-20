import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'student@gmail.com', title: 'email', description: 'email' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: 'student', title: 'username', description: 'username' })
  @IsOptional()
  is_public: string;
}
