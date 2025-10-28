import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value?: string }) =>
    typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined,
  )
  @MaxLength(255, { message: 'Title is too long' })
  title?: string;
}
