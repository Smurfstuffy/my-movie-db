import {useGetFavouriteMoviesQuery} from '../redux/movieApi';

const FavouritesPage = () => {
  const {data, error, isLoading} = useGetFavouriteMoviesQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  console.log(data);
  return <div>FavouritesPage</div>;
};

export default FavouritesPage;
