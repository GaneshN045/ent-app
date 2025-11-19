// navigation/stacks/CommonStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Component
import NotificationsScreen from '../../screens/notification/notifications'; 
import SCREENS from '../../constants/screens';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';

const Stack = createStackNavigator();

export default function CommonStack() {
  return (
    <Stack.Navigator
    screenOptions={({ navigation }: any) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#000',
      headerTitleStyle: { fontWeight: 'bold' },

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 15 }}
        >
          <MaterialIcons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
      ),
    })}
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











<Stack.Screen
name={SCREENS.NOTIFICATIONS_SCREEN}
component={NotificationsScreen}
options={{
  title: 'Notifications',
}}
/>