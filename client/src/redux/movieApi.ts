/* eslint-disable @typescript-eslint/no-explicit-any */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {MoviesResponse, MoviesArguments, Movie} from '../types/redux';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  tagTypes: ['Movies'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api/'}),
  endpoints: build => ({
    getMovies: build.query<MoviesResponse, MoviesArguments>({
      query: ({page, limit, search}) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (search) params.append('search', search);
        return `movies?${params.toString()}`;
      },
      transformResponse: (response: MoviesResponse) => {
        if (response && Array.isArray(response.data)) {
          return response;
        }
        return {data: [], totalPages: 0, currentPage: 1, totalMovies: 0};
      },
      transformErrorResponse: (response: {status: number; data: any}) => {
        return {error: response.data?.message || 'An unknown error occurred'};
      },
      providesTags: result =>
        result
          ? [
              ...result.data.map(({_id}) => ({type: 'Movies', _id}) as const),
              {type: 'Movies', id: 'LIST'},
            ]
          : [{type: 'Movies', id: 'LIST'}],
    }),
    getMovie: build.query<{data: Movie}, string>({
      query: id => `movies/${id}`,
      providesTags: (result, error, id) => [{type: 'Movies', id}],
    }),
    getFavouriteMovies: build.query<MoviesResponse, MoviesArguments>({
      query: ({page, limit}) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        return `movies/favourites?${params.toString()}`;
      },
      transformResponse: (response: MoviesResponse) => {
        if (response && Array.isArray(response.data)) {
          return response;
        }
        return {data: [], totalPages: 0, currentPage: 1, totalMovies: 0};
      },
      transformErrorResponse: (response: {status: number; data: any}) => {
        return {error: response.data?.message || 'An unknown error occurred'};
      },
      providesTags: result =>
        result
          ? [
              ...result.data.map(({_id}) => ({type: 'Movies', _id}) as const),
              {type: 'Movies', id: 'LIST'},
            ]
          : [{type: 'Movies', id: 'LIST'}],
    }),
    addMovie: build.mutation<Movie, Partial<Movie>>({
      query: newMovie => ({
        url: 'movies',
        method: 'POST',
        body: newMovie,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{type: 'Movies', id: 'LIST'}],
    }),
    deleteMovie: build.mutation<string, string>({
      query(id) {
        return {
          url: `movies/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{type: 'Movies', id: 'LIST'}],
    }),
    toggleFavourite: build.mutation<Movie, string>({
      query(id) {
        return {
          url: `movies/${id}/toggle-favourite`,
          method: 'PUT',
        };
      },
      invalidatesTags: [{type: 'Movies', id: 'LIST'}],
    }),
    updateMovie: build.mutation<Movie, Partial<Movie>>({
      query(data) {
        const {_id, ...body} = data;
        return {
          url: `movies/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{type: 'Movies', id: 'LIST'}],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetFavouriteMoviesQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useToggleFavouriteMutation,
  useUpdateMovieMutation,
} = movieApi;
