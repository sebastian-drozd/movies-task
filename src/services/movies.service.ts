import { MovieDb, Movie, CreateMovieDb as CreateMovieDbType, CreateMovie as CreateMovieType } from '@src/types';
import * as dbService from './db.service';

export const addMovie = async (movie: CreateMovieType): Promise<Movie> => {
  const newMovie = {
    ...movie,
    year: movie.year.toString(),
    runtime: movie.runtime.toString(),
  };

  const createdMovie = await dbService.add<CreateMovieDbType, MovieDb>('movies', newMovie);

  return {
    ...createdMovie,
    year: parseInt(createdMovie.year),
    runtime: parseInt(createdMovie.runtime),
  };
};
