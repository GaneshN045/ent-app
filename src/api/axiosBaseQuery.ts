import axios, { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../store/store';

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
    const startTime = Date.now();
    const state = api.getState() as RootState;
    const token = state.auth?.token;

    const requestUrl = baseUrl + args.url;

    try {
      // -----------------------------
      // 📌 Detailed Request Logging
      // -----------------------------
      console.log('\n════════════ API REQUEST ════════════');
      console.log('URL:', requestUrl);
      console.log('Method:', args.method ?? 'GET');
      console.log('Headers:', {
        ...(args.headers || {}),
        Authorization: token ? `Bearer ${token}` : undefined,
        Accept: 'application/json',
      });
      console.log('Params:', args.params);
      console.log('Data:', args.data);
      console.log('──────────────────────────────────────');

      const response = await axios.request({
        url: requestUrl,
        method: args.method ?? 'GET',
        data: args.data,
        params: args.params,
        headers: {
          ...(args.headers || {}),
          Authorization: token ? `Bearer ${token}` : undefined,
          Accept: 'application/json',
        },
        transformResponse: [(data) => data],
      });

      const duration = Date.now() - startTime;

      // -----------------------------
      // 📌 Detailed Response Logging
      // -----------------------------
      console.log('\n════════════ API RESPONSE ════════════');
      console.log('URL:', requestUrl);
      console.log('Status:', response.status);
      console.log('Response Time:', duration + 'ms');
      console.log('Raw Data:', response.data);
      console.log('──────────────────────────────────────');

      // Parse JSON only if it is a JSON string
      let parsedData = response.data;
      if (typeof response.data === 'string') {
        try {
          parsedData = JSON.parse(response.data);
        } catch {
          parsedData = response.data;
        }
      }

      return { data: parsedData };
    } catch (error: any) {
      const duration = Date.now() - startTime;

      // -----------------------------
      // ❌ Detailed Error Logging
      // -----------------------------
      console.log('\n════════════ API ERROR ════════════');
      console.log('URL:', requestUrl);
      console.log('Response Time:', duration + 'ms');
      console.log('Status:', error.response?.status);
      console.log('Message:', error.message);
      console.log('Error Data:', error.response?.data);
      console.log('──────────────────────────────────────');

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
