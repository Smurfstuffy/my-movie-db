import {useState, useCallback, FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '../ui/Button';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProps} from '../../types/components/common/form';
import {schema, FormFields} from '../../types/components/common/form';
import {useAddMovieMutation} from '../../redux/movieApi';
import Trash from '../icons/Trash';

const Form: FC<FormProps> = ({handleClose}) => {
  const [addMovie, {isLoading}] = useAddMovieMutation();

  const [genres, setGenres] = useState<string[]>(['']);
  const [actors, setActors] = useState<string[]>(['']);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleAddGenre = useCallback(() => {
    setGenres(prev => [...prev, '']);
  }, []);

  const handleRemoveGenre = useCallback((index: number) => {
    setGenres(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddActor = useCallback(() => {
    setActors(prev => [...prev, '']);
  }, []);

  const handleRemoveActor = useCallback((index: number) => {
    setActors(prev => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await addMovie(data).unwrap();
      handleClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to add a movie';
      setError('root', {message: errorMessage});
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title')}
        type="text"
        placeholder="Title"
        className="input"
      />
      {errors.title && <span className="error">{errors.title.message}</span>}

      <input
        {...register('overview')}
        type="text"
        placeholder="Overview"
        className="input mt-2 sm:mt-4"
      />
      {errors.overview && (
        <span className="error">{errors.overview.message}</span>
      )}

      <input
        {...register('posterUrl')}
        type="text"
        placeholder="Poster URL"
        className="input mt-2 sm:mt-4"
      />
      {errors.posterUrl && (
        <span className="error">{errors.posterUrl.message}</span>
      )}

      <div className="flex flex-col">
        {genres.map((_, index) => (
          <div className="flex flex-col mt-2 sm:mt-4" key={index}>
            <div className="flex gap-x-2">
              <input
                {...register(`genre.${index}` as const)}
                type="text"
                placeholder={`Genre ${index + 1}`}
                className="input grow"
              />
              {genres.length > 1 && (
                <Button
                  variant="danger-outline"
                  onClick={() => handleRemoveGenre(index)}
                >
                  <Trash size="size-5 sm:size-6 lg:size-7" />
                </Button>
              )}
            </div>
            {errors.genre && errors.genre[index] && (
              <span className="error">{errors.genre[index]?.message}</span>
            )}
          </div>
        ))}
        <Button variant="primary-outline" onClick={handleAddGenre}>
          Add Genre
        </Button>
      </div>

      <div className="flex flex-col">
        {actors.map((_, index) => (
          <div className="flex flex-col mt-2 sm:mt-4" key={index}>
            <div className="flex gap-x-2">
              <input
                {...register(`actor.${index}` as const)}
                type="text"
                placeholder={`Actor ${index + 1}`}
                className="input grow"
              />
              {actors.length > 1 && (
                <Button
                  variant="danger-outline"
                  onClick={() => handleRemoveActor(index)}
                >
                  <Trash size="size-5 sm:size-6 lg:size-7" />
                </Button>
              )}
            </div>
            {errors.actor && errors.actor[index] && (
              <span className="error">{errors.actor[index]?.message}</span>
            )}
          </div>
        ))}
        <Button variant="primary-outline" onClick={handleAddActor}>
          Add Actor
        </Button>
      </div>

      <input
        {...register('director')}
        type="text"
        placeholder="Director"
        className="input mt-2 sm:mt-4"
      />
      {errors.director && (
        <span className="error">{errors.director.message}</span>
      )}

      <input
        {...register('releaseDate')}
        type="date"
        placeholder="Release Date"
        className="input mt-2 sm:mt-4"
      />
      {errors.releaseDate && (
        <span className="error">{errors.releaseDate.message}</span>
      )}

      <input
        {...register('voteAverage')}
        type="number"
        placeholder="Average Vote"
        className="input mt-2 sm:mt-4"
        step={1}
        min={0}
        max={10}
      />
      {errors.voteAverage && (
        <span className="error">{errors.voteAverage.message}</span>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting || isLoading}
        className="mt-2 sm:mt-4"
      >
        {isLoading ? 'Adding...' : 'Add New Movie'}
      </Button>
      {errors.root && <span className="error">{errors.root.message}</span>}
    </form>
  );
};

export default Form;
