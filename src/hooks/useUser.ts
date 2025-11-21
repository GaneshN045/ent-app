import { useGetUserInfoQuery } from '../api/userApi';
import { useAppDispatch } from '../app/hooks';
import { setUserInfo } from '../features/user/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading, refetch } = useGetUserInfoQuery();

  if (data) {
    dispatch(setUserInfo(data));
  }

  return { data, error, isLoading, refetch };
};
