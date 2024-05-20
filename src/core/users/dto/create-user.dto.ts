import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль должен быть непустым' })
  password: string;
}
