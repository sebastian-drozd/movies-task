import { ArrayUnique, IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { GENRES } from '@constants/genres';

export default class CreateMovieSchema {
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsIn(GENRES, { each: true })
  genres: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  runtime: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  director: string;

  @IsString()
  @IsOptional()
  actors?: string;

  @IsString()
  @IsOptional()
  plot?: string;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}
