import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'diplom project', title: 'name', description: 'name' })
  name: string;

  @ApiProperty({ example: 'true', title: 'is_public', description: 'is_public' })
  is_public: boolean;
}
