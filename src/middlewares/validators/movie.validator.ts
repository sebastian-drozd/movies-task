import { NextFunction, Request, Response } from 'express';
import { ValidationError, validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import CreateMovieSchema from '@schemas/create-movie.schema';

export const addMovieValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const objectToValidate = plainToInstance(CreateMovieSchema, req.body);
    await validateOrReject(objectToValidate, { whitelist: true, forbidNonWhitelisted: true });

    next();
  } catch (errors) {
    if (Array.isArray(errors) && errors.length > 0 && errors[0] instanceof ValidationError) {
      res.status(400).send({
        errors: errors.map((error: ValidationError) => ({
          property: error.property,
          value: error.value,
          constraintErrors: error.constraints,
        })),
      });
    } else {
      res.status(500).send({ message: 'Unknown error' });
    }
  }
};
