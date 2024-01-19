import { NextFunction, Request, Response } from 'express';

import { addMovieValidator } from '../../../src/middlewares/validators/movie.validator';
import { GENRES } from '../../../src/constants/genres';

describe('Input validation', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('Returns error due to invalid input', async () => {
    mockRequest.body = {
      title: '',
      genres: ['Genre1', 'Crime'],
      year: '2024',
      runtime: 120,
      director: 'x'.repeat(260),
      actors: 120,
      posterUrl: 'url',
    };

    await addMovieValidator(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: [
        {
          property: 'genres',
          value: mockRequest.body.genres,
          constraintErrors: {
            isIn: `each value in genres must be one of the following values: ${GENRES.join(', ')}`,
          },
        },
        {
          property: 'title',
          value: mockRequest.body.title,
          constraintErrors: {
            isNotEmpty: 'title should not be empty',
          },
        },
        {
          property: 'year',
          value: mockRequest.body.year,
          constraintErrors: {
            isNumber: 'year must be a number conforming to the specified constraints',
          },
        },
        {
          property: 'director',
          value: mockRequest.body.director,
          constraintErrors: {
            maxLength: 'director must be shorter than or equal to 255 characters',
          },
        },
        {
          property: 'actors',
          value: mockRequest.body.actors,
          constraintErrors: {
            isString: 'actors must be a string',
          },
        },
      ],
    });
  });

  it('Returns exception due to unknown error', async () => {
    mockRequest.body = {
      title: 'Test title',
      genres: ['Family', 'Crime'],
      year: 2024,
      runtime: 120,
      director: 'John Doe',
      actors: 'Actor1, Actor2',
      posterUrl: 'url',
    };

    await addMovieValidator(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('Responses with unknown error', async () => {
    await addMovieValidator(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unknown error' });
  });
});
