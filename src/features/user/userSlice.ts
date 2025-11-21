import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './types';

const initialState: UserState = { name: '', email: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: () => initialState,
  },
});

export const { setUserInfo, clearUser } = userSlice.actions;
export default userSlice.reducer;
