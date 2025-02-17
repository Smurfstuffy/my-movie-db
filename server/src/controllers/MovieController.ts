import express from 'express';
import Movie from '../models/Movie';

class MovieController {
  getMovies = async (req: express.Request, res: express.Response) => {
    try {
      const {
        page = '1',
        limit = '10',
        search = '',
        genres,
        minRating,
        maxRating,
        minReleaseYear,
        maxReleaseYear,
      } = req.query;

      const pageNumber = Math.max(1, parseInt(page as string, 10));
      const limitNumber = Math.max(1, parseInt(limit as string, 10));

      const query: Record<string, unknown> = {};

      if (search) {
        query.title = {$regex: search, $options: 'i'};
      }

      if (genres) {
        const genresArray = (genres as string).split(',');
        query.genre = {$in: genresArray};
      }

      if (minRating || maxRating) {
        query.voteAverage = {};
        if (minRating)
          (query.voteAverage as Record<string, unknown>).$gte = parseFloat(
            minRating as string,
          );
        if (maxRating)
          (query.voteAverage as Record<string, unknown>).$lte = parseFloat(
            maxRating as string,
          );
      }

      if (minReleaseYear || maxReleaseYear) {
        query.releaseDate = {};
        if (minReleaseYear)
          (query.releaseDate as Record<string, unknown>).$gte = new Date(
            `${minReleaseYear}-01-01`,
          );
        if (maxReleaseYear)
          (query.releaseDate as Record<string, unknown>).$lte = new Date(
            `${maxReleaseYear}-12-31`,
          );
      }

      const movies = await Movie.find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

      const totalMovies = await Movie.countDocuments(query);

      return res.status(200).json({
        data: movies,
        totalPages: Math.ceil(totalMovies / limitNumber),
        currentPage: pageNumber,
        totalMovies,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return res.status(500).json({message: errorMessage});
    }
  };

  getFavouriteMovies = async (req: express.Request, res: express.Response) => {
    try {
      const {page = '1', limit = '10'} = req.query;

      const pageNumber = Math.max(1, parseInt(page as string, 10));
      const limitNumber = Math.max(1, parseInt(limit as string, 10));

      const movies = await Movie.find({isFavourite: true})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

      const totalMovies = await Movie.countDocuments({isFavourite: true});

      return res.status(200).json({
        data: movies,
        totalPages: Math.ceil(totalMovies / limitNumber),
        currentPage: pageNumber,
        totalMovies,
      });
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
