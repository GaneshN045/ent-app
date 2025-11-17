// navigation/stacks/ProfileStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../screens/Profile/ProfileScreen';

// Custom Header
import CustomHeader from '../../components/headers/CustomHeader';

// Screens constant
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hidden globally, we enable manually like SettingsStack
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      {/* Profile Home Screen (with Custom Header) */}
      <Stack.Screen
        name={SCREENS.PROFILE_SCREEN}
        component={ProfileScreen}
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
