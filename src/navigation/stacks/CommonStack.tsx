// navigation/stacks/CommonStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Component
import NotificationsScreen from '../../screens/notification/notifications'; 
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function CommonStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // Show header (we'll customize it)
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name={SCREENS.NOTIFICATIONS_SCREEN}
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
    </Stack.Navigator>
  );
}