import { NextFunction, Request, Response } from 'express';

import { errorHandler } from '../../../src/middlewares/handlers/error.handler';
import AppError from '../../../src/utils/app-error';

describe('Error handler', () => {
  const mockRequest: Partial<Request> = {};
  const nextFunction: NextFunction = jest.fn();
  let err: AppError | Error;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('Returns AppError with status and message (known error)', async () => {
    const errorMessage = 'Item not found';
    err = new AppError(errorMessage, 404);

    errorHandler(err, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it('Returns 500 error with message (default error)', async () => {
    const errorMessage = 'Error occurred';
    err = new Error(errorMessage);

    errorHandler(err as AppError | Error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: errorMessage,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
