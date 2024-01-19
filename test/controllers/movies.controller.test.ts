import { NextFunction, Request, Response } from 'express';

import * as moviesService from '../../src/services/movies.service';
import * as moviesController from '../../src/controllers/movies.controller';
import db from '../../db/mock.db.json';
import AppError from '../../src/utils/app-error';

jest.mock('../../src/services/movies.service');

describe('Test adding a movie', () => {
  const mockRequest: Partial<Request> = {
    body: {
      title: 'Test title',
      genres: ['Family', 'Crime'],
      year: 2024,
      runtime: 120,
      director: 'John Doe',
      actors: 'Actor1, Actor2',
      posterUrl: 'url',
    },
  };
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('Should return added movie after success', async () => {
    const expectedId = Math.max(...db.movies.map((movie) => movie.id)) + 1;

    (moviesService.addMovie as jest.Mock).mockResolvedValue({
      id: expectedId,
      ...mockRequest.body,
    });

    await moviesController.addMovie(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({
      id: expectedId,
      ...mockRequest.body,
    });
  });

  it('Should pass error while creating a movie to error handler', async () => {
    (moviesService.addMovie as jest.Mock).mockRejectedValue(new AppError('Error while updating database...', 500));

    await moviesController.addMovie(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});

describe('Test getting movies', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('Should return single movie (no params)', async () => {
    const randomIndex = Math.floor(Math.random() * db.movies.length);
    (moviesService.getMovies as jest.Mock).mockResolvedValue([db.movies[randomIndex]]);

    await moviesController.getMovies(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([
      expect.objectContaining({
        id: randomIndex + 1,
      }),
    ]);
  });

  it('Should pass error while creating a movie to error handler', async () => {
    (moviesService.getMovies as jest.Mock).mockRejectedValue(new Error());

    await moviesController.getMovies(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
