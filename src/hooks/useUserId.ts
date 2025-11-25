import { useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

export const useUserId = (): {
  userId: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
} => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const id = await storage.loadUserId();
    setUserId(id);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { userId, loading, refresh } as const;
};
