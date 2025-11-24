
// ============================================
// authApi.ts
// ============================================
import { baseApi } from '../baseApi';
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  User,
} from '../types/authApiTypes';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /* ✅ FIXED: Correct endpoint path */
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        console.log('Send OTP called with payload:', arg);
        try {
          const { data } = await queryFulfilled;
          console.log('Send OTP success:', data);
        } catch (error) {
          console.log('Send OTP error:', error);
        }
      },
      invalidatesTags: ['Auth'],
    }),

    /* ✅ ALIAS: Keep useLoginMutation for backward compatibility */
    login: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        console.log('Login (send OTP) called with payload:', arg);
        try {
          const { data } = await queryFulfilled;
          console.log('Login (send OTP) success:', data);
        } catch (error) {
          console.log('Login (send OTP) error:', error);
        }
      },
      invalidatesTags: ['Auth'],
    }),

    /* ✅ FIXED: Correct endpoint path (relative, not full URL) */
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: body => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        console.log('Verify OTP called with payload:', arg);
        try {
          const { data } = await queryFulfilled;
          console.log('Verify OTP success:', data);
        } catch (error) {
          console.log('Verify OTP error:', error);
        }
      },
      invalidatesTags: ['Auth'],
    }),

    
  }),
  overrideExisting: false,
});

export const {
  useSendOtpMutation,
  useLoginMutation, // ✅ EXPORTED for backward compatibility
  useVerifyOtpMutation,
} = authApi;
