import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'student', title: 'email', description: 'email' })
  email: string;

  @ApiProperty({ example: '12345', title: 'password', description: 'password' })
  password: string;
}
