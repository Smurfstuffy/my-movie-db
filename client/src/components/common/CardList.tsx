import {FC} from 'react';
import Card from './Card';
import {CardListProps} from '../../types/components/common/card';

const CardList: FC<CardListProps> = ({movies}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {movies.map(movie => {
        return (
          <Card
            key={movie._id}
            _id={movie._id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            overview={movie.overview}
            posterUrl={movie.posterUrl}
            isFavourite={movie.isFavourite}
            voteAverage={movie.voteAverage}
          />
        );
      })}
    </div>
  );
};

export default CardList;
