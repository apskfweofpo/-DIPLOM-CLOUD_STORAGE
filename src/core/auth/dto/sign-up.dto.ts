import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'student', title: 'username', description: 'username' })
  username: string;

  @ApiProperty({ example: 'student@gmail.com', title: 'email', description: 'email' })
  email: string;

  @ApiProperty({ example: '12345', title: 'password', description: 'password' })
  password: string;
}
