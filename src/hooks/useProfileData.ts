// ============================================
// useProfileData.ts
// ============================================
import { useEffect } from 'react';
import { useGetMemberProfileQuery } from '../services/api/profileApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProfile } from '../store/slices/profileSlice';
import { useUserId } from './useUserId';

export const useProfileData = () => {
  const dispatch = useAppDispatch();
  const storedProfile = useAppSelector(state => state.profile.data);
  const { userId }: { userId: string | null } = useUserId();
  const memberId = userId;
  const skipProfileQuery = !memberId;

  const { data, error, isLoading, refetch } = useGetMemberProfileQuery(memberId ?? '', {
    skip: skipProfileQuery,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setProfile(data.data));
    }
  }, [data?.data, dispatch]);

  const profile = data?.data ?? storedProfile;

  return {
    profile,
    memberId,
    error,
    isLoading,
    refetch,
  };
};
