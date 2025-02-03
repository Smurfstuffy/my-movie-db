import {useState, useCallback, useEffect, FC} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  filtersSchema,
  FiltersFormFields,
  FiltersProps,
} from '../../types/components/common/filters';
import Trash from '../icons/Trash';
import Button from '../ui/Button';

const Filters: FC<FiltersProps> = ({handleClose}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FiltersFormFields>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      genres: [],
      minRating: undefined,
      maxRating: undefined,
      minReleaseYear: undefined,
      maxReleaseYear: undefined,
    },
  });

  const [genres, setGenres] = useState<string[]>(['']);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlGenres = params.get('genres')?.split(',') || [''];
    const minRating = params.get('minRating');
    const maxRating = params.get('maxRating');
    const minReleaseYear = params.get('minReleaseYear');
    const maxReleaseYear = params.get('maxReleaseYear');

    setGenres(urlGenres);
    reset({
      minRating: minRating ? Number(minRating) : undefined,
      maxRating: maxRating ? Number(maxRating) : undefined,
      minReleaseYear: minReleaseYear ? Number(minReleaseYear) : undefined,
      maxReleaseYear: maxReleaseYear ? Number(maxReleaseYear) : undefined,
    });
  }, [location.search, reset]);

  const handleAddGenre = useCallback(() => {
    setGenres(prev => [...prev, '']);
  }, []);

  const handleRemoveGenre = useCallback((index: number) => {
    setGenres(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleGenreChange = (index: number, value: string) => {
    setGenres(prev => {
      const newGenres = [...prev];
      newGenres[index] = value;
      return newGenres;
    });
  };

  const onSubmit = (data: FiltersFormFields) => {
    const params = new URLSearchParams(location.search);

    if (genres.length && genres.some(genre => genre.trim())) {
      params.set('genres', genres.filter(Boolean).join(','));
    } else {
      params.delete('genres');
    }

    if (data.minRating) params.set('minRating', data.minRating.toString());
    else params.delete('minRating');

    if (data.maxRating) params.set('maxRating', data.maxRating.toString());
    else params.delete('maxRating');

    if (data.minReleaseYear)
      params.set('minReleaseYear', data.minReleaseYear.toString());
    else params.delete('minReleaseYear');

    if (data.maxReleaseYear)
      params.set('maxReleaseYear', data.maxReleaseYear.toString());
    else params.delete('maxReleaseYear');

    handleClose();
    navigate(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 sm:gap-y-4 rounded-lg bg-white p-4"
    >
      <div className="flex flex-col gap-y-2">
        {genres.map((genre, index) => (
          <div key={index} className="flex gap-x-2">
            <input
              type="text"
              placeholder={`Genre ${index + 1}`}
              value={genre}
              onChange={e => handleGenreChange(index, e.target.value)}
              className="input grow"
            />
            {genres.length > 1 && (
              <Button
                type="button"
                variant="danger-outline"
                onClick={() => handleRemoveGenre(index)}
              >
                <Trash size="size-5 sm:size-6 lg:size-7" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="primary-outline"
          onClick={handleAddGenre}
        >
          Add Genre
        </Button>
      </div>

      {errors.genres && <span className="error">{errors.genres.message}</span>}

      <div className="flex gap-x-2">
        <input
          {...register('minRating')}
          type="number"
          placeholder="Min Vote"
          className="input flex-1"
          min={0}
          max={10}
        />
        <input
          {...register('maxRating')}
          type="number"
          placeholder="Max Vote"
          className="input flex-1"
          min={0}
          max={10}
        />
      </div>
      <div className="flex gap-x-2">
        {errors.minRating && (
          <span className="error text-red-500 flex-1">
            {errors.minRating.message}
          </span>
        )}
        {errors.maxRating && (
          <span className="error text-red-500 flex-1">
            {errors.maxRating.message}
          </span>
        )}
      </div>

      <div className="flex gap-x-2">
        <input
          {...register('minReleaseYear')}
          type="number"
          placeholder="Min Year"
          className="input flex-1"
          min={1900}
          max={new Date().getFullYear()}
        />
        <input
          {...register('maxReleaseYear')}
          type="number"
          placeholder="Max Year"
          className="input flex-1"
          min={1900}
          max={new Date().getFullYear()}
        />
      </div>
      <div className="flex gap-x-2">
        {errors.minReleaseYear && (
          <span className="error text-red-500 flex-1">
            {errors.minReleaseYear.message}
          </span>
        )}
        {errors.maxReleaseYear && (
          <span className="error text-red-500 flex-1">
            {errors.maxReleaseYear.message}
          </span>
        )}
      </div>

      <Button variant="primary" type="submit">
        Apply Filters
      </Button>
    </form>
  );
};

export default Filters;
