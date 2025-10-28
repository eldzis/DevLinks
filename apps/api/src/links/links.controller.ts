import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto, LinkIdParamDto, LinkResponseDto } from './dto';

@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('links')
  async create(@Body() dto: CreateLinkDto): Promise<LinkResponseDto> {
    const link = await this.linksService.create(dto);
    return new LinkResponseDto(link);
  }

  @Get('links')
  async getAll(): Promise<LinkResponseDto[]> {
    const links = await this.linksService.getAll();
    return links.map((link) => new LinkResponseDto(link));
  }

  @Get(':id')
  @Redirect()
  async findById(@Param() params: LinkIdParamDto) {
    const link = await this.linksService.findById(params);
    if (!link) throw new NotFoundException('Link for redirect not found');
    return { url: link.url, statusCode: 302 };
  }

  @Delete('links/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: LinkIdParamDto): Promise<void> {
    await this.linksService.remove(params);
  }
}
