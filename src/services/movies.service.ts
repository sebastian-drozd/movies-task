import { ParsedQs } from 'qs';

import { MovieDb, Movie, CreateMovieDb as CreateMovieDbType, CreateMovie as CreateMovieType } from '@src/types';
import { filterMoviesByDuration, filterAndSortMoviesByGenres, getRandomMovie } from '@src/helpers/movies';
import * as dbService from './db.service';

export const getMovies = async (queryParams: ParsedQs): Promise<Movie[]> => {
  const { duration, genres } = queryParams;

  const moviesDb = await dbService.getAll<MovieDb>('movies');

  const movies: Movie[] = moviesDb.map((movie) => ({
    ...movie,
    year: Number(movie.year),
    runtime: Number(movie.runtime),
  }));

  if (!duration && !genres) {
    return [getRandomMovie(movies)];
  }

  if (duration && !isNaN(+duration) && !genres) {
    const filteredMovies = filterMoviesByDuration(movies, +duration);
    return [getRandomMovie(filteredMovies)];
  }

  const genresAsArray = (Array.isArray(genres) ? genres : [genres]) as string[];

  const filteredByGenres = filterAndSortMoviesByGenres(movies, genresAsArray);

  if (duration && genres) {
    return filterMoviesByDuration(filteredByGenres, +duration);
  }

  return filteredByGenres;
};

export const addMovie = async (movie: CreateMovieType): Promise<Movie> => {
  const newMovie = {
    ...movie,
    year: movie.year.toString(),
    runtime: movie.runtime.toString(),
  };

  const createdMovie = await dbService.add<CreateMovieDbType, MovieDb>('movies', newMovie);

  return {
    ...createdMovie,
    year: Number(createdMovie.year),
    runtime: Number(createdMovie.runtime),
  };
};
