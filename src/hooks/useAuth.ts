import { useLoginMutation } from '../services/api/authApi';
import { useAppDispatch } from '../store/hooks';
import {
  setToken as setTokenAction,
  clearToken as clearTokenAction,
  setHydrated,
} from '../store/slices/authSlice';
import { storage } from '../utils/storage';
import type { SendOtpRequest, SendOtpResponse } from '../services/types/authApiTypes';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loginMutation, loginState] = useLoginMutation();

  const login = async (credentials: SendOtpRequest): Promise<SendOtpResponse> => {
    const res = await loginMutation(credentials).unwrap();
    const token = res?.data?.token;
    if (token) {
      await storage.saveToken(token);
      dispatch(setTokenAction(token));
    }
    return res;
  };

  const logout = async () => {
    try {
      // await logoutMutation(undefined).unwrap();
    } catch (e) {
      // ignore server logout errors
    }
    await storage.clearToken();
    await storage.clearUserId();
    dispatch(clearTokenAction());
  };

  const hydrate = async (_dispatchHydrate: (token: string | null) => void) => {
    const start = Date.now();
    console.log('hydrate start', new Date(start).toISOString());
    const t = await storage.loadToken();
    const after = Date.now();
    console.log('hydrate token fetched after', after - start, 'ms');
    if (t) dispatch(setTokenAction(t));
    dispatch(setHydrated(true));
    console.log('hydrate complete after', Date.now() - start, 'ms');
  };

  return { login, logout, loginState, hydrate };
};
