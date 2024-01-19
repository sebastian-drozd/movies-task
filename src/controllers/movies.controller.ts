import { NextFunction, Request, Response } from 'express';

import * as moviesService from '@services/movies.service';
import { CreateMovieDTO } from '@src/types';

export const getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies = await moviesService.getMovies(req.query);

    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const addMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieData = req.body as CreateMovieDTO;
    const newMovie = await moviesService.addMovie(movieData);

    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};
