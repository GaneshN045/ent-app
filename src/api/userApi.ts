import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserInfo: builder.query<{ name: string; email: string }, void>({
      query: () => ({ url: API_ENDPOINTS.USER.INFO, method: 'GET' }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: body => ({ url: API_ENDPOINTS.USER.UPDATE, method: 'PUT', data: body }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserMutation } = userApi;
