import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../api/axiosBaseQuery';

const API_BASE_URL = process.env.BASE_URL?.trim() || 'https://uat.decipay.in/enterprises/api/';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Auth', 'User'],
  endpoints: () => ({}),
});
