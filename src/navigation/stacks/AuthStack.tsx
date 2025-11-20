import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import LoginScreen from '../../screens/Auth/LoginScreen';
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
}
