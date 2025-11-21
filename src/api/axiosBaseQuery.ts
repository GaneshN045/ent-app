// custom baseQuery using axios with interceptors
import axios, { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../app/store';

interface Args {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<Args, unknown, unknown> =>
  async (args, api, extraOptions) => {
    try {
      const state = api.getState() as RootState;
      const token = state.auth?.token;

      console.log('[API REQUEST]', {
        url: baseUrl + args.url,
        method: args.method ?? 'GET',
        params: args.params,
        data: args.data,
      });

      const result = await axios.request({
        url: baseUrl + args.url,
        method: args.method ?? 'GET',
        data: args.data,
        params: args.params,
        headers: {
          ...(args.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      console.log('[API RESPONSE]', {
        url: baseUrl + args.url,
        status: result.status,
        data: result.data,
      });

      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;

      console.log('[API ERROR]', {
        url: baseUrl + args.url,
        status: err.response?.status,
        data: err.response?.data || err.message,
      });

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
