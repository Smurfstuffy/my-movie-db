import {Movie} from '../../redux';

export type CardProps = Omit<Movie, 'genre' | 'actors' | 'director'>;

export interface CardListProps {
  movies: CardProps[];
}
