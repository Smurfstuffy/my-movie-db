import {Movie} from '../../redux';

export type CardProps = Movie;

export interface CardListProps {
  movies: CardProps[];
}
