// ============================================
// fundApi.ts
// ============================================
import { baseApi } from '../baseApi';
import type {
  MoveToBankRequest,
  PrefundResponse,
  WalletToWalletRequest,
  WalletToWalletResponse,
} from '../types/fundApiTypes';

type MoveToBankResponse = PrefundResponse;

export const fundApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    requestPrefund: builder.mutation<PrefundResponse, FormData>({
      query: formData => ({
        url: '/api/prefund/request',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    walletToWalletTransfer: builder.mutation<WalletToWalletResponse, WalletToWalletRequest>({
      query: body => ({
        url: '/api/wallet-to-wallet/transfer',
        method: 'POST',
        body,
      }),
    }),
    sendPayoutRequest: builder.mutation<MoveToBankResponse, MoveToBankRequest>({
      query: body => ({
        url: '/api/move-to-bank/send-payout-request',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRequestPrefundMutation,
  useWalletToWalletTransferMutation,
  useSendPayoutRequestMutation,
} = fundApi;
