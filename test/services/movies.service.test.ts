import db from '../../db/mock.db.json';
import * as dbService from '../../src/services/db.service';
import * as moviesService from '../../src/services/movies.service';

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

describe('Test getting movies', () => {
  (dbService.getAll as jest.Mock).mockResolvedValue(db.movies);

  afterEach(() => {
    (dbService.getAll as jest.Mock).mockClear();
  });

  it('Should return one movie (no params)', async () => {
    const result = await moviesService.getMovies({});

    expect(dbService.getAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
  });

  it('Should return one movie (duration only)', async () => {
    const result = await moviesService.getMovies({ duration: '120' });

    expect(dbService.getAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].runtime).toBeGreaterThanOrEqual(110);
    expect(result[0].runtime).toBeLessThanOrEqual(130);
  });

  it('Should return movies containing specified genres', async () => {
    const result = await moviesService.getMovies({ genres: ['drama', 'horror'] });

    expect(dbService.getAll).toHaveBeenCalledTimes(1);
    expect(result.length).toBeGreaterThan(1);
    expect(result[0].genres).toContain('Drama');
    expect(result[0].genres).toContain('Horror');
    expect(result[1].genres).toContain('Drama');
    expect(result[1].genres).not.toContain('Horror');
  });

  it('Should return movies containing specified genres in given duration range', async () => {
    const result = await moviesService.getMovies({ duration: '90', genres: ['drama', 'crime'] });

    expect(dbService.getAll).toHaveBeenCalledTimes(1);
    expect(result.length).toBeGreaterThan(1);
    expect(result[1].genres).toContain('Drama');
    expect(result[1].genres).toContain('Crime');
    expect(result[2].genres).toContain('Drama');
    expect(result[2].genres).not.toContain('Crime');
    expect(result.every((movie) => movie.runtime >= 80 && movie.runtime <= 100)).toBe(true);
  });
});
