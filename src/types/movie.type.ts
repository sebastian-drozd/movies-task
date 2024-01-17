import { CreateMovieDb, CreateMovie } from '.';

export type Movie = {
  id: number;
} & CreateMovie;

export type MovieDb = {
  id: number;
} & CreateMovieDb;
