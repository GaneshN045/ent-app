// uses axiosBaseQuery for all RTK Query endpoints
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://dummyapi.com' }),
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});
