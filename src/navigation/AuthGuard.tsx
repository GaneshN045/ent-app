import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../app/hooks';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector(s => s.auth);

  if (!auth.hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
};
