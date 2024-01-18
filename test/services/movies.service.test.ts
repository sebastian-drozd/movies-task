import * as dbService from '../../src/services/db.service';
import * as moviesService from '../../src/services/movies.service';
import db from '../../db/db.json';

jest.mock('../../src/services/db.service');

describe('Test adding a movie', () => {
  const newMovie = {
    title: 'New Movie',
    year: 2024,
    runtime: 97,
    genres: ['Crime', 'Drama'],
    director: 'John Doe',
    actors: 'John Doe, Jan Kowalski',
    plot: 'Movie about testing.',
  };

  const newMovieStringNumbers = {
    ...newMovie,
    year: newMovie.year.toString(),
    runtime: newMovie.runtime.toString(),
  };

  it('Should return added movie after success', async () => {
    const expectedId = Math.max(...db.movies.map((movie) => movie.id)) + 1;

    (dbService.add as jest.Mock).mockResolvedValue({
      id: expectedId,
      ...newMovieStringNumbers,
    });

    const result = await moviesService.addMovie(newMovie);

    expect(dbService.add).toHaveBeenCalledWith('movies', expect.objectContaining(newMovieStringNumbers));

    expect(result).toEqual({
      id: expectedId,
      ...newMovie,
    });
  });
});
