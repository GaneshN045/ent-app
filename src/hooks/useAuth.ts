import { useLoginMutation, useLogoutMutation } from '../api/authApi';
import { useAppDispatch } from '../app/hooks';
import {
  setToken as setTokenAction,
  clearToken as clearTokenAction,
  setHydrated,
} from '../features/auth/authSlice';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loginMutation, loginState] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = async (credentials: { email: string; password: string }) => {
    const res = await loginMutation(credentials).unwrap();
    if (res?.token) {
      await storage.saveToken(res.token);
      dispatch(setTokenAction(res.token));
    }
    return res;
  };

  const logout = async () => {
    try {
      await logoutMutation(undefined).unwrap();
    } catch (e) {
      // ignore server logout errors
    }
    await storage.clearToken();
    dispatch(clearTokenAction());
  };

  const hydrate = async (_dispatchHydrate: (token: string | null) => void) => {
    const t = await storage.loadToken();
    if (t) dispatch(setTokenAction(t));
    dispatch(setHydrated(true));
  };

  return { login, logout, loginState, hydrate };
};
