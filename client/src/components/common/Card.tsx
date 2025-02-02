import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../ui/Button';
import {CardProps} from '../../types/components/common/card';
import Trash from '../icons/Trash';
import Bookmark from '../icons/BookMark';
import BookmarkSlash from '../icons/BookmarkSlash';
import PencilSquare from '../icons/PencilSquare';
import Star from '../icons/Star';

const Card: FC<CardProps> = ({
  _id,
  title,
  releaseDate,
  overview,
  posterUrl,
  isFavourite,
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
      <Button
        variant={isFavourite ? 'primary-outline' : 'primary'}
        className="absolute hover:scale-95"
      >
        {isFavourite ? (
          <BookmarkSlash size="size-5 sm:size-6 lg:size-7" />
        ) : (
          <Bookmark size="size-5 sm:size-6 lg:size-7" />
        )}
      </Button>
      <img src={posterUrl} alt={title} className="rounded-l-lg" />
      <div className="flex flex-col">
        <h1 className="text-slate-800 font-bold text-base sm:text-xl md:text-2xl md:mt-1 lg:mt-2 xl:mt-4 line-clamp-2">
          {title}
        </h1>
        <span className="font-medium text-sm sm:text-base md:text-lg text-slate-600">
          {formattedDate}
        </span>
        <span className="font-normal text-sm text-slate-700 line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:line-clamp-6">
          {overview}
        </span>
        <div className="flex text-yellow-500 mt-auto md:mb-1 lg:mb-2 xl:mb-4">
          <Star size="size-5 sm:size-6 lg:size-7" />
          <p className="font-medium text-sm sm:text-base md:text-lg text-slate-600">
            {voteAverage}/10
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <Button variant="danger-outline">
          <Trash size="size-5 sm:size-6 lg:size-7" />
        </Button>
        <Button variant="edit-outline">
          <PencilSquare size="size-5 sm:size-6 lg:size-7" />
        </Button>
      </div>
    </div>
  );
};

export default Card;
