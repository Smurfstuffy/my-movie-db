import {useParams} from 'react-router-dom';
import {useGetMovieQuery} from '../redux/movieApi';
import MovieDetailsSkeleton from '../components/skeletons/MovieDetailsSkeleton';

const MovieDetailsPage = () => {
  const {id} = useParams<{id: string}>();
  const {data, isLoading, error} = useGetMovieQuery(id!);

  if (isLoading) return <MovieDetailsSkeleton />;
  if (error)
    return (
      <span className="flex justify-center text-red-600 font-medium text-base sm:text-lg md:text-xl">
        Failed to fetch movie
      </span>
    );

  if (data) {
    const {
      posterUrl,
      title,
      releaseDate,
      voteAverage,
      overview,
      genre,
      actors,
      director,
    } = data.data;

    return (
      <div className="grid grid-cols-[1fr_2fr] grid-rows-[2fr_1fr] gap-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="row-span-2">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-slate-800 font-bold text-base sm:text-xl md:text-2xl">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-normal text-slate-600">
            <span className="font-semibold">Director:</span> {director}
          </p>
          <p className="text-sm sm:text-base md:text-lg font-normal text-slate-600">
            <span className="font-semibold">Release Date:</span>{' '}
            {new Date(releaseDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-sm sm:text-base md:text-lg font-normal text-slate-600">
            <span className="font-semibold">Rating:</span> {voteAverage}/10
          </p>
        </div>

        <div className="col-span-2 flex flex-col gap-4">
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
              Overview
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600">
              {overview}
            </p>
          </div>

          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
              Genres
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-slate-600">
              {genre.map((g, index) => (
                <li key={index}>{g}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800">
              Actors
            </h2>
            <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-slate-600">
              {actors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MovieDetailsPage;
