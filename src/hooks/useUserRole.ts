import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Role } from '../navigation/menuConfig';

export function useUserRole() {
  const reduxRole: Role | undefined = useAppSelector((state: any) => state.auth.user?.role as Role);
  const [role, setRole] = useState<Role>(reduxRole ?? 'RT');

  useEffect(() => {
    setRole(reduxRole ?? 'RT');
  }, [reduxRole]);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem('userRole')
      .then(stored => {
        if (stored && isMounted) {
          setRole(stored as Role);
        }
      })
      .catch(() => {
        /* ignore */
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return role;
}
