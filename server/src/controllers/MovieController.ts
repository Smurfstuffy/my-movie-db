import express from 'express';
import Movie from '../models/Movie';

class MovieController {
  getMovies = async (req: express.Request, res: express.Response) => {
    try {
      const movies = await Movie.find();
      return res.status(200).json({data: movies});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return res.status(500).json({message: errorMessage});
    }
  };

  getMovie = async (req: express.Request, res: express.Response) => {
    try {
      const {id} = req.params;
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({message: 'Movie is not found'});
      }

      return res.status(200).json({data: movie});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return res.status(500).json({message: errorMessage});
    }
  };

  createMovie = async (req: express.Request, res: express.Response) => {
    try {
      const newMovie = new Movie({...req.body, isFavourite: false});
      await newMovie.save();
      return res.status(201).json({data: newMovie});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Bad request';
      return res.status(400).json({message: errorMessage});
    }
  };

  updateMovie = async (req: express.Request, res: express.Response) => {
    try {
      const {id} = req.params;
      const existingMovie = await Movie.findById(id);

      if (!existingMovie) {
        return res.status(404).json({message: 'Movie is not found'});
      }

      const updatedData = {
        ...existingMovie.toObject(),
        ...req.body,
      };

      const updatedMovie = await Movie.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      return res.status(200).json({data: updatedMovie});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return res.status(500).json({message: errorMessage});
    }
  };

  toggleIsFavourite = async (req: express.Request, res: express.Response) => {
    try {
      const {id} = req.params;
      const movie = await Movie.findById(id);

      if (!movie) {
        return res.status(404).json({message: 'Movie is not found'});
      }

      movie.isFavourite = !movie.isFavourite;
      await movie.save();
      return res.status(200).json({data: movie});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return res.status(500).json({message: errorMessage});
    }
  };

  deleteMovie = async (req: express.Request, res: express.Response) => {
    try {
      const {id} = req.params;
      const deletedMovie = await Movie.findByIdAndDelete(id);

      if (!deletedMovie) {
        return res.status(404).json({message: 'Movie is not found'});
      }

      return res.status(200).json({message: 'Movie deleted successfully'});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return res.status(500).json({message: errorMessage});
    }
  };
}

export default new MovieController();
