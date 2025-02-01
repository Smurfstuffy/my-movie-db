import {useGetMoviesQuery} from '../redux/movieApi';

const HomePage = () => {
  const {data, error, isLoading} = useGetMoviesQuery({page: 11});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  console.log(data);

  return <div>HomePage</div>;
};

export default HomePage;
