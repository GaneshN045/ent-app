// ============================================
// authApiTypes.ts
// ============================================
import type { Role } from '../../navigation/menuConfig';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface SendOtpRequest {
  userName: string;
  password: string;
  salt: string;
  iv: string;
  url: string;
}

export interface SendOtpResponse {
  token(token: any): unknown;
  statusCode: number;
  message?: string;
  data?: {
    otp?: string | number;
    [key: string]: any;
  } | null;
}

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
