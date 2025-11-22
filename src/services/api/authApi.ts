import { baseApi } from './baseApi';
import type { Role } from '../../navigation/menuConfig';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SendOtpRequest {
  userName: string;
  password: string;
  salt: string;
  iv: string;
  url: string;
}

export interface SendOtpResponse {
  statusCode: number;
  message?: string;
  data?: {
    otp?: string | number;
    [key: string]: any;
  } | null;
}

/* ✅ NEW: VERIFY OTP REQUEST & RESPONSE */
export interface VerifyOtpRequest {
  userName: string;
  otp: string | number;
}

export interface VerifyOtpResponse {
  statusCode: number;
  message: string;
  data: {
    outletName?: string;
    role: Role;
    role_id: string;
    sub_role_id: string;
    hierarchyId: string;
    mobileNumber: string;
    emailId: string;
    token: string;
    products: any[];
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /* SEND OTP API */
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: body => ({
        url: 'https://uat.decipay.in/enterprises/auth/login',
        method: 'POST',
        body,
      }),
    }),

    /* LOCAL LOGIN (NOT NEEDED FOR OTP FLOW) */
    login: builder.mutation<LoginResponse, LoginRequest>({
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

    /* GET AUTH USER */
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),

    /* ✅ NEW VERIFY OTP API */
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: body => ({
        url: 'https://uat.decipay.in/enterprises/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

/* EXPORT HOOKS */
export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useSendOtpMutation,
  useVerifyOtpMutation, // ✅ NEW EXPORT
} = authApi;
