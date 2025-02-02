import {useSearchParams} from 'react-router-dom';
import CardList from '../components/common/CardList';
import Pagination from '../components/common/Pagination';
import SkeletonCardList from '../components/skeletons/SkeletonCardList';
import {useGetFavouriteMoviesQuery} from '../redux/movieApi';

const FavouritesPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const {data, error, isLoading} = useGetFavouriteMoviesQuery({page});

  if (isLoading) return <SkeletonCardList />;

  if (error)
    return (
      <span className="flex justify-center text-red-600 font-medium text-base sm:text-lg md:text-xl">
        Failed to fetch movies
      </span>
    );

  return (
    <div className="flex flex-col">
      <CardList movies={data?.data || []} />
      {data && data?.totalPages > 1 && (
        <Pagination currentPage={page} totalPages={data.totalPages || 1} />
      )}
    </div>
  );
};

export default FavouritesPage;
