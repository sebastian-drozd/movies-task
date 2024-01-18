import { Movie } from '@src/types';

export const getRandomMovie = (movies: Movie[]): Movie => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

export const filterMoviesByDuration = (movies: Movie[], duration: number): Movie[] => {
  return movies.filter(({ runtime }) => runtime >= duration - 10 && runtime <= duration + 10);
};

export const filterAndSortMoviesByGenres = (movies: Movie[], genres: string[]): Movie[] => {
  const lowerCaseGenres = genres.map((genreFromQuery) => genreFromQuery.toLowerCase());
  return movies
    .filter((movie) => movie.genres.some((genre) => lowerCaseGenres.includes(genre.toLowerCase())))
    .sort((a, b) => countGenreMatches(b.genres, lowerCaseGenres) - countGenreMatches(a.genres, lowerCaseGenres));
};

const countGenreMatches = (movieGenres: string[], queryGenres: string[]): number => {
  return movieGenres.reduce((count, genre) => (queryGenres.includes(genre.toLowerCase()) ? count + 1 : count), 0);
};
