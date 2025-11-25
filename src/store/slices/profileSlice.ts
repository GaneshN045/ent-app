// ============================================
// profileSlice.ts
// ============================================
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MemberProfileData } from '../../services/types/profileApiTypes';

interface ProfileState {
  data: MemberProfileData | null;
  lastFetchedAt: number | null;
}

const initialState: ProfileState = {
  data: null,
  lastFetchedAt: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<MemberProfileData>) => {
      state.data = action.payload;
      state.lastFetchedAt = Date.now();
    },
    clearProfile: state => {
      state.data = null;
      state.lastFetchedAt = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
