import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../navigation/menuConfig';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.hydrated = action.payload;
    },
  },
});

export const { login, logout, setUser, setToken, clearToken, setHydrated } = authSlice.actions;
export default authSlice.reducer;
