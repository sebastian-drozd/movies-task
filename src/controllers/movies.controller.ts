import { NextFunction, Request, Response } from 'express';

import * as moviesService from '@services/movies.service';
import { CreateMovie as CreateMovieType } from '@src/types';

export const addMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieData = req.body as CreateMovieType;
    const newMovie = await moviesService.addMovie(movieData);

    res.json(newMovie);
  } catch (error) {
    next(error);
  }
};
