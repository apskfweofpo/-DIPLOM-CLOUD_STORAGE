import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  years_with_us: string;

  @ApiProperty()
  arrival_week: number;

  @ApiProperty()
  eliminate_week: number;

  @ApiProperty()
  eliminate_reason: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  patronymic: string;

  @ApiProperty()
  birth_date: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  user_id: number;
}
