import { MovieDb } from '@src/types';

export type DbEntities = {
  movies: MovieDb[];
};

export type DbSchema = {
  genres: string[];
} & DbEntities;
