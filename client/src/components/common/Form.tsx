import {useState, useCallback, FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '../ui/Button';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProps} from '../../types/components/common/form';
import {schema, FormFields} from '../../types/components/common/form';
import {
  useAddMovieMutation,
  useUpdateMovieMutation,
} from '../../redux/movieApi';
import Trash from '../icons/Trash';

const Form: FC<FormProps> = ({handleClose, movie}) => {
  const [addMovie] = useAddMovieMutation();
  const [updateMovie] = useUpdateMovieMutation();

  const [genres, setGenres] = useState<string[]>(movie?.genre || ['']);
  const [actors, setActors] = useState<string[]>(movie?.actors || ['']);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>({
    defaultValues: movie ? {...movie, actor: movie.actors} : undefined,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    genres.forEach((genre, index) => {
      setValue(`genre.${index}`, genre);
    });
    actors.forEach((actor, index) => {
      setValue(`actor.${index}`, actor);
    });
  }, [genres, actors, setValue]);

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
    if (movie) {
      try {
        await updateMovie({
          ...data,
          _id: movie._id,
          actors: data.actor,
        }).unwrap();
        handleClose();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update a movie';
        setError('root', {message: errorMessage});
      }
    } else {
      try {
        await addMovie({...data, actors: data.actor}).unwrap();
        handleClose();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to add a movie';
        setError('root', {message: errorMessage});
      }
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
                  type="button"
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
        <Button
          type="button"
          variant="primary-outline"
          onClick={handleAddGenre}
        >
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
                  type="button"
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
        <Button
          type="button"
          variant="primary-outline"
          onClick={handleAddActor}
        >
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
        step={0.1}
        min={0}
        max={10}
      />
      {errors.voteAverage && (
        <span className="error">{errors.voteAverage.message}</span>
      )}

      <Button
        variant={movie ? 'edit' : 'primary'}
        type="submit"
        disabled={isSubmitting}
        className="mt-2 sm:mt-4"
      >
        {isSubmitting
          ? movie
            ? 'Updating...'
            : 'Adding...'
          : movie
            ? 'Update Movie'
            : 'Add New Movie'}
      </Button>
      {errors.root && <span className="error">{errors.root.message}</span>}
    </form>
  );
};

export default Form;
