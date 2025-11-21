import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from './types';

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  hydrated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    clearToken: state => {
      state.token = null;
      state.isLoggedIn = false;
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.hydrated = action.payload;
    },
  },
});

export const { setToken, clearToken, setHydrated } = authSlice.actions;
export default authSlice.reducer;
