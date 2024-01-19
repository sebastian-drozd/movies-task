import { MovieDTO } from '@src/types';

export const getRandomMovie = (movies: MovieDTO[]): MovieDTO => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

export const filterMoviesByDuration = (movies: MovieDTO[], duration: number): MovieDTO[] => {
  return movies.filter(({ runtime }) => runtime >= duration - 10 && runtime <= duration + 10);
};

export const filterAndSortMoviesByGenres = (movies: MovieDTO[], genres: string[]): MovieDTO[] => {
  const lowerCaseGenres = genres.map((genreFromQuery) => genreFromQuery.toLowerCase());
  return movies
    .filter((movie) => movie.genres.some((genre) => lowerCaseGenres.includes(genre.toLowerCase())))
    .sort((a, b) => countGenreMatches(b.genres, lowerCaseGenres) - countGenreMatches(a.genres, lowerCaseGenres));
};

const countGenreMatches = (movieGenres: string[], queryGenres: string[]): number => {
  return movieGenres.reduce((count, genre) => (queryGenres.includes(genre.toLowerCase()) ? count + 1 : count), 0);
};
