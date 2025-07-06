import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL + '/borrows' }),
  tagTypes: ['Borrows', 'Books'], 
  endpoints: (builder) => ({
    createBorrow: builder.mutation({
      query: (borrow) => ({ url: '/', method: 'POST', body: borrow }),
      invalidatesTags: ['Borrows', 'Books'], 
    }),
    getSummary: builder.query({
      query: () => '/summary',
      providesTags: ['Borrows'],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetSummaryQuery } = borrowApi;
