import { Link } from '@prisma/client';

export class LinkResponseDto {
  id: number;
  url: string;
  title: string | null;
  createdAt: Date;

  constructor(link: Link) {
    this.id = link.id;
    this.url = link.url;
    this.title = link.title ?? null;
    this.createdAt = link.created_at;
  }
}
