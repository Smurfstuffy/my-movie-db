import mongoose, {Schema, Document} from 'mongoose';

export interface IMovie extends Document {
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

const MovieSchema: Schema = new mongoose.Schema({
  releaseDate: {type: Date, required: true},
  title: {type: String, required: true},
  overview: {type: String},
  genre: {type: [String], required: true},
  posterUrl: {type: String, required: true},
  actors: {type: [String], required: true},
  director: {type: String, required: true},
  isFavourite: {type: Boolean, default: false},
  voteAverage: {type: Number, required: true},
});

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;
