import { ApiProperty } from '@nestjs/swagger';
import { PageMeta } from './page-meta.class';

export class PageData<T> {
  constructor(content: T[], meta: PageMeta) {
    this.content = content;
    this.page = meta.page;
    this.totalPages = meta.pages;
    this.perPage = meta.perPage;
    this.totalElements = meta.total;
  }

  @ApiProperty({ isArray: true })
  readonly content: T[];

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly totalPages: number;

  @ApiProperty()
  readonly perPage: number;

  @ApiProperty()
  readonly totalElements: number;
}

export class Page<T> {
  @ApiProperty()
  readonly data: PageData<T>;

  @ApiProperty()
  readonly meta: string | null;

  constructor(data: T[], meta: PageMeta, metaMessage: string | null = null) {
    this.data = new PageData(data, meta);
    this.meta = metaMessage;
  }
}
