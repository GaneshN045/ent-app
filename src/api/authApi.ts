import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: credentials => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        data: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({ url: API_ENDPOINTS.AUTH.LOGOUT, method: 'POST' }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
