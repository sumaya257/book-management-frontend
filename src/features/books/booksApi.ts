import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL + '/books' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({ query: () => '/', providesTags: ['Books'] }),
    getBookById: builder.query({ query: (id) => `/${id}` }),
    addBook: builder.mutation({
      query: (newBook) => ({ url: '/', method: 'POST', body: newBook }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...book }) => ({ url: `/${id}`, method: 'PUT', body: book }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;