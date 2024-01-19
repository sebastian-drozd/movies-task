import { CreateMovieDb, CreateMovieDTO } from '.';

export type MovieDTO = {
  id: number;
} & CreateMovieDTO;

export type MovieDb = {
  id: number;
} & CreateMovieDb;
