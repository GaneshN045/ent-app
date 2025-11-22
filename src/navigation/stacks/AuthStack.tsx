import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import LoginScreen from '../../screens/Auth/LoginScreen';
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator<AuthStackParamList>();
const LOAD_TIME = Date.now();

export default function AuthStack() {
  useEffect(() => {
    console.log('[PERF] AuthStack rendered in:', Date.now() - LOAD_TIME, 'ms');
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Log when module loads
console.log('[PERF] AuthStack module loaded');
