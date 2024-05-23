import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ROLES } from '../constrants/roles.enum';

export class ChangeRoleDto {
  @ApiProperty()
  @IsEnum(ROLES)
  role: ROLES;
}
