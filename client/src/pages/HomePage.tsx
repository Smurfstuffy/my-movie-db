import {useSearchParams} from 'react-router-dom';
import CardList from '../components/common/CardList';
import SkeletonCardList from '../components/skeletons/SkeletonCardList';
import {useGetMoviesQuery} from '../redux/movieApi';
import Pagination from '../components/common/Pagination';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const {data, error, isLoading} = useGetMoviesQuery({page});

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
      <Pagination currentPage={page} totalPages={data?.totalPages || 1} />
    </div>
  );
};

export default HomePage;
