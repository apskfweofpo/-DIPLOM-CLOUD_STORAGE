import { ApiProperty } from '@nestjs/swagger';
import { PageMetaParameters } from './page-meta.interface';

export class PageMeta {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pages: number;

  @ApiProperty()
  readonly perPage: number;

  @ApiProperty()
  readonly total: number;

  constructor({ pageOptions, total }: PageMetaParameters) {
    this.page = pageOptions.page;
    this.perPage = pageOptions.perPage;
    this.total = total;
    this.pages = Math.ceil(total / pageOptions.perPage);
  }
}
