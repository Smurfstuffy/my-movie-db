import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../ui/Button';
import {CardProps} from '../../types/components/common/card';

const Card: FC<CardProps> = ({
  _id,
  title,
  releaseDate,
  overview,
  posterUrl,
  //isFavourite,
  voteAverage,
}) => {
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movies/${_id}`)}
      className="grid grid-cols-[2fr_4fr_1fr] gap-4 bg-white rounded-lg hover:cursor-pointer hover:drop-shadow-lg"
    >
      <Button variant="primary-outline" className="absolute">
        Toggle
      </Button>
      <img src={posterUrl} alt={title} className="rounded-l-lg" />
      <div className="flex flex-col">
        <h1 className="text-slate-800 font-bold text-base sm:text-xl md:text-2xl lg:mt-2 xl:mt-4">
          {title}
        </h1>
        <span className="font-medium text-sm sm:text-base md:text-lg text-slate-600">
          {formattedDate}
        </span>
        <span className="font-normal text-sm text-slate-700 line-clamp-3 sm:line-clamp-5 md:line-clamp-6">
          {overview}
        </span>
      </div>

      <div className="flex flex-col justify-between">
        <Button variant="danger-outline" className="self-end">
          X
        </Button>
        <p className="self-center text-slate-700 font-medium text-base sm:text-lg md:text-xl">
          {voteAverage}
        </p>
        <Button variant="neutral" className="self-end">
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Card;
