import fs from 'fs/promises';

import { add } from '../../src/services/db.service';
import { CreateMovieDb, MovieDb } from '../../src/types';
import db from '../../db/db.json';

jest.mock('fs/promises');

(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(db));

describe('Test adding a movie', () => {
  const newMovie = {
    title: 'New Movie',
    year: '2024',
    runtime: '97',
    genres: ['Crime', 'Drama'],
    director: 'John Doe',
    actors: 'John Doe, Jan Kowalski',
    plot: 'Movie about testing.',
  };

  it('Should return added movie after success', async () => {
    const result = await add<CreateMovieDb, MovieDb>('movies', newMovie);

    expect(result).toEqual({
      ...newMovie,
      id: Math.max(...db.movies.map((movie) => movie.id)) + 1,
    });
  });

  it('Should return error (wrong data retrieved)', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(db.movies));

    await expect(add<CreateMovieDb, MovieDb>('movies', newMovie)).rejects.toThrow('Error while updating database...');
  });
});
