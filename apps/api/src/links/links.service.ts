import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto, FindLinkDto } from './dto';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLinkDto) {
    return this.prisma.link.create({
      data,
    });
  }

  getAll() {
    return this.prisma.link.findMany({ orderBy: { created_at: 'desc' } });
  }

  findById({ id }: FindLinkDto) {
    return this.prisma.link.findUnique({
      where: { id },
    });
  }
}
