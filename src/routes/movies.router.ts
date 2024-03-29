import { Router } from 'express';

import * as moviesController from '@controllers/movies.controller';
import { addMovieValidator } from '@src/middlewares/validators/movie.validator';

const router = Router();

router.get('/', moviesController.getMovies);
router.post('/', addMovieValidator, moviesController.addMovie);

export default router;
