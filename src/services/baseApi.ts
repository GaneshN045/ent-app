
// ============================================
// baseApi.ts
// ============================================
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

// ✅ FIXED: Correct base URL structure
const API_BASE_URL = process.env.BASE_URL?.trim() || 'https://uat.decipay.in/enterprises';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Auth', 'User'],
  endpoints: () => ({}),
});
