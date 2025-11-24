// ============================================
// axiosBaseQuery.ts
// ============================================
import axios, { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../store/store';

interface Args {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: any;
  body?: any;
  params?: any;
  headers?: Record<string, string>;
}

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<Args, unknown, unknown> =>
  async (args, api, extraOptions) => {
    const startTime = Date.now();
    const state = api.getState() as RootState;
    let token = state.auth?.token;

    // ✅ FIX: Remove quotes from token if present
    if (token) {
      token = token.replace(/^["']|["']$/g, '');
    }

    const requestUrl = baseUrl + args.url;

    try {
      const payload = args.data ?? args.body;
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(args.headers || {}),
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      console.log('\n════════════ API REQUEST ════════════');
      console.log('URL:', requestUrl);
      console.log('Method:', args.method ?? 'GET');
      console.log('Headers:', headers);
      console.log('Params:', args.params);
      console.log('Data:', payload);
      console.log('──────────────────────────────────────');

      const response = await axios.request({
        url: requestUrl,
        method: args.method ?? 'GET',
        data: payload,
        params: args.params,
        headers,
        transformResponse: [(data) => data],
      });

      const duration = Date.now() - startTime;

      console.log('\n════════════ API RESPONSE ════════════');
      console.log('URL:', requestUrl);
      console.log('Status:', response.status);
      console.log('Response Time:', duration + 'ms');
      console.log('Raw Data:', response.data);
      console.log('──────────────────────────────────────');

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