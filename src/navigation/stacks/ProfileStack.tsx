// navigation/stacks/ProfileStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../../components/headers/CustomHeader';
import SCREENS from '../../constants/screens';
import ProfileHomeScreen from '../../screens/Profile/ProfileHomeScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hidden globally, we enable manually like SettingsStack
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* Profile Home Screen (with Custom Header) */}
      <Stack.Screen
        name={SCREENS.PROFILE_HOME_SCREEN}
        component={ProfileHomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />

      {/* 
        If you add more profile-related screens later, 
        follow this structure:
        
        <Stack.Screen
          name={SCREENS.PROFILE_EDIT_SCREEN}
          component={EditProfileScreen}
          options={{ headerShown: true, title: "Edit Profile" }}
        />
      */}
    </Stack.Navigator>
  );
}
