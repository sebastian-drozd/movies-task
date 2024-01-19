import supertest from 'supertest';

import app from '../../src/app';
import * as moviesService from '../../src/services/movies.service';
import db from '../../db/mock.db.json';

jest.mock('../../src/services/movies.service');

const moviesPath = '/movies';

describe('Test movies endpoints', () => {
  const newMovie = {
    title: 'New Movie',
    year: 2024,
    runtime: 97,
    genres: ['Crime', 'Drama'],
    director: 'John Doe',
    actors: 'John Doe, Jan Kowalski',
    plot: 'Movie about testing.',
  };

  it('Should return added movie after success', async () => {
    const expectedId = Math.max(...db.movies.map((movie) => movie.id)) + 1;

    (moviesService.addMovie as jest.Mock).mockResolvedValue({
      id: expectedId,
      ...newMovie,
    });

    const result = await supertest(app).post(moviesPath).send(newMovie);

    expect(result.body).toEqual({
      id: expectedId,
      ...newMovie,
    });
  });

  it('Should return error due to incorrect payload', async () => {
    const result = await supertest(app)
      .post(moviesPath)
      .send({
        ...newMovie,
        year: '2024',
      });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('errors');
    expect(result.body.errors[0].property).toBe('year');
    expect(result.body.errors[0].constraintErrors).toHaveProperty('isNumber');
  });
});
