import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'user/find-all/',
    }),
    getHomesByUser: builder.query({
      query: (username) => `home/find-by-user/${username}`,
    }),
    updateHomeUsers: builder.mutation({
      query: ({ home, updatedUsers }) => ({
        url: `home/update-users/${encodeURIComponent(home.street_address)}`,
        method: 'POST',
        body: { users: updatedUsers },
      }),
    }),
    getHomeUsers: builder.query({
      query: (streetAddress) => ({
        url: `user/find-by-home/${encodeURIComponent(streetAddress)}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useUpdateHomeUsersMutation,
  useGetHomeUsersQuery,
} = api;
