import { NextFunction, Request, Response } from 'express';

import AppError from '@utils/app-error';

export const errorHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }

  next();
};
