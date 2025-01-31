import {createBrowserRouter} from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import PageNotFound from './pages/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {path: '', element: <HomePage />},
      {path: 'favourites', element: <FavouritesPage />},
      {path: 'movies/:id', element: <MovieDetailsPage />},
    ],
  },
  {path: '*', element: <PageNotFound />},
]);
