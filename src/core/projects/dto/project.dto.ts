import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty({ example: 'student@gmail.com', title: 'email', description: 'email' })
  id: string;

  @ApiProperty({ example: 'student@gmail.com', title: 'email', description: 'email' })
  name: string;

  @ApiProperty({ example: 'student', title: 'username', description: 'username' })
  size: string;

  @ApiProperty({ example: 'true', title: 'username', description: 'username' })
  is_public: string;
}
