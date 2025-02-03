export interface Movie {
  _id: string;
  releaseDate: Date;
  title: string;
  overview?: string;
  genre: string[];
  posterUrl: string;
  actors: string[];
  director: string;
  isFavourite: boolean;
  voteAverage: number;
}

export interface MoviesResponse {
  data: Movie[];
  totalPages: number;
  currentPage: number;
  totalMovies: number;
}

export interface MoviesArguments {
  page?: number;
  limit?: number;
  search?: string;
  genres?: string[];
  minRating?: number;
  maxRating?: number;
  minReleaseYear?: number;
  maxReleaseYear?: number;
}
