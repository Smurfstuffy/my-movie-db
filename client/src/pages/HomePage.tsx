import {useSearchParams} from 'react-router-dom';
import CardList from '../components/common/CardList';
import SkeletonCardList from '../components/skeletons/SkeletonCardList';
import {useGetMoviesQuery} from '../redux/movieApi';
import Pagination from '../components/common/Pagination';
import Button from '../components/ui/Button';
import Funnel from '../components/icons/Funnel';
import Filters from '../components/common/Filters';
import {useCallback, useState, useMemo} from 'react';
import Modal from '../components/ui/Modal';

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const page = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );
  const search = useMemo(
    () => searchParams.get('search') || '',
    [searchParams],
  );
  const genres = useMemo(
    () => searchParams.get('genres')?.split(',') || [],
    [searchParams],
  );
  const minRating = useMemo(
    () => parseFloat(searchParams.get('minRating') || '') || undefined,
    [searchParams],
  );
  const maxRating = useMemo(
    () => parseFloat(searchParams.get('maxRating') || '') || undefined,
    [searchParams],
  );
  const minReleaseYear = useMemo(
    () => parseInt(searchParams.get('minReleaseYear') || '', 10) || undefined,
    [searchParams],
  );
  const maxReleaseYear = useMemo(
    () => parseInt(searchParams.get('maxReleaseYear') || '', 10) || undefined,
    [searchParams],
  );

  const {data, error, isLoading} = useGetMoviesQuery({
    page,
    search,
    genres,
    minRating,
    maxRating,
    minReleaseYear,
    maxReleaseYear,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (isLoading) return <SkeletonCardList />;

  if (error)
    return (
      <span className="flex justify-center text-red-600 font-medium text-base sm:text-lg md:text-xl">
        Failed to fetch movies
      </span>
    );

  return (
    <div className="flex flex-col">
      <Button variant="neutral" className="mb-4" onClick={handleOpen}>
        <Funnel size="size-5 sm:size-6 lg:size-7" />
      </Button>
      <CardList movies={data?.data || []} />
      {data && data?.totalPages > 1 && (
        <Pagination currentPage={page} totalPages={data.totalPages || 1} />
      )}
      <Modal open={open} onClose={handleClose}>
        <Filters handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default HomePage;
