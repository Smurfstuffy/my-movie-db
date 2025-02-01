/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import MovieController from '../controllers/MovieController';

const router = express.Router();

router.get('/api/movies', MovieController.getMovies as any);
router.get('/api/movies/favourites', MovieController.getFavouriteMovies as any);
router.get('/api/movies/:id', MovieController.getMovie as any);
router.post('/api/movies', MovieController.createMovie as any);
router.put('/api/movies/:id', MovieController.updateMovie as any);
router.put(
  '/api/movies/:id/toggle-favourite',
  MovieController.toggleIsFavourite as any,
);
router.delete('/api/movies/:id', MovieController.deleteMovie as any);

export default router;
