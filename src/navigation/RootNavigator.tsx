import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AuthStack from './stacks/AuthStack';
import MainDrawer from './MainDrawer';
import { useAppSelector } from '../store/hooks';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import SCREENS from '../constants/screens';

const Stack = createStackNavigator<RootStackParamList>();
const APP_BOOT_TIME = Date.now();

export default function RootNavigator() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const reportedLogin = useRef(false);

  useEffect(() => {
    console.log('[PERF] RootNavigator mounted:', Date.now() - APP_BOOT_TIME, 'ms');
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !reportedLogin.current) {
      console.log('[PERF] Login screen shown after', Date.now() - APP_BOOT_TIME, 'ms');
      reportedLogin.current = true;
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer
      onReady={() => {
        console.log('[PERF] Navigation ready:', Date.now() - APP_BOOT_TIME, 'ms');
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name={SCREENS.ROOT_MAIN} component={MainDrawer} />
        ) : (
          <Stack.Screen name={SCREENS.ROOT_AUTH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});