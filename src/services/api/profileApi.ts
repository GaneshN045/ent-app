// ============================================
// profileApi.ts
// ============================================
import { baseApi } from '../baseApi';
import type { MemberProfileResponse, WalletBalanceResponse } from '../types/profileApiTypes';

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
  }),
  overrideExisting: false,
});

export const { useGetMemberProfileQuery, useGetWalletBalanceQuery } = profileApi;