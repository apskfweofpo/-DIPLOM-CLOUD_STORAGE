import { ApiProperty } from '@nestjs/swagger';

export class DeleteFilesDto {
  @ApiProperty({
    title: 'ids',
    default: '1,2,3',
  })
  ids: string;
}
