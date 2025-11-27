// File: app/services/api/reportsApi.ts
import { baseApi } from '../baseApi';
import type { ProductDropdownResponse, SubProductDropdownResponse } from '../types/profileApiTypes';
import type {
  PendingTransactionsResponse,
  PendingTransactionsFetchArgs,
} from '../types/reportsApiTypes';

export const reportsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReportProductDropdown: builder.query<ProductDropdownResponse, void>({
      query: () => ({
        url: '/api/products/dropdown/active',
        method: 'GET',
      }),
    }),
    getReportSubProductsDropdown: builder.query<SubProductDropdownResponse, string | void>({
      query: productId => ({
        url: productId ? `/api/sub-products/dropdown/${productId}` : '/api/sub-products/dropdown',
        method: 'GET',
      }),
    }),
    getReportPendingTransactions: builder.query<
      PendingTransactionsResponse,
      PendingTransactionsFetchArgs
    >({
      query: ({ payload, page = 0, size = 10 }) => ({
        url: '/api/funding/settlement',
        method: 'POST',
        params: {
          page,
          size,
        },
        data: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReportProductDropdownQuery,
  useGetReportSubProductsDropdownQuery,
  useGetReportPendingTransactionsQuery,
  useLazyGetReportPendingTransactionsQuery,
} = reportsApi;
