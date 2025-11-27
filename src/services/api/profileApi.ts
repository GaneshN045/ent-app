// ============================================
// profileApi.ts
// ============================================
import { baseApi } from '../baseApi';
import type {
  MemberProfileResponse,
  ProductDropdownResponse,
  SubProductDropdownResponse,
  WalletBalanceResponse,
} from '../types/profileApiTypes';

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /* ✅ FIXED: Correct endpoint path with /api prefix */
    getMemberProfile: builder.query<MemberProfileResponse, string>({
      query: memberId => ({
        url: `/api/dashboard/profile/${memberId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getWalletBalance: builder.query<WalletBalanceResponse, string>({
      query: memberId => ({
        url: `/api/dashboard/wallet-balance/${memberId}`,
        method: 'GET',
      }),
    }),
    getProductDropdown: builder.query<ProductDropdownResponse, void>({
      query: () => ({
        url: '/api/products/dropdown/active',
        method: 'GET',
      }),
    }),
    getSubProductsDropdown: builder.query<SubProductDropdownResponse, void>({
      query: () => ({
        url: '/api/sub-products/dropdown',
        method: 'GET',
      }),
    }),
    getSubProductsDropdownByProduct: builder.query<SubProductDropdownResponse, string | void>({
      query: productId => ({
        url: productId ? `/api/sub-products/dropdown/${productId}` : '/api/sub-products/dropdown',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMemberProfileQuery,
  useGetWalletBalanceQuery,
  useGetSubProductsDropdownQuery,
  useGetProductDropdownQuery,
  useGetSubProductsDropdownByProductQuery,
} = profileApi;
