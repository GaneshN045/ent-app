import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '../../store/store';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://your-api-base-url.com', // TODO: replace with your real API base URL
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    headers.set('Content-Type', 'application/json');

    return headers;
  },
});

const baseQueryWithLogging: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  console.log('[API REQUEST]', {
    url: typeof args === 'string' ? args : args.url,
    method: typeof args === 'string' ? 'GET' : args.method,
    params: typeof args === 'string' ? undefined : args.params,
    body: typeof args === 'string' ? undefined : args.body,
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  console.log('[API RESPONSE]', {
    url: typeof args === 'string' ? args : args.url,
    result,
  });

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithLogging,
  tagTypes: ['Auth', 'User'],
  endpoints: () => ({}),
});
