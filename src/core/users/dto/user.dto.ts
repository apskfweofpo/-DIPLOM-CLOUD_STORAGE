import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '1', title: 'id', description: 'id' })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ example: 'student@gmail.com', title: 'email', description: 'email' })
  email: string;

  @ApiProperty({ example: 'student', title: 'username', description: 'username' })
  username: string;

  @ApiProperty({ example: '12345', title: 'password', description: 'password' })
  password: string;
}
