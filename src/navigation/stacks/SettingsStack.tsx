// navigation/stacks/SettingsStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Components
import SettingsHomeScreen from '../../screens/Settings/SettingsHomeScreen';
import CreateSubUserScreen from '../../screens/Settings/CreateSubUserScreen';
import ChangeTPINScreen from '../../screens/Settings/ChangeTPINScreen';
import MyCertificateScreen from '../../screens/Settings/MyCertificateScreen';
import LowBalanceAlertScreen from '../../screens/Settings/LowBalanceAlertScreen';
import IDCardScreen from '../../screens/Settings/IDCardScreen';

// Custom Component
import CustomHeader from '../../components/headers/CustomHeader';
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // default hidden — we control per screen
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      {/* Settings Home with Custom Header */}
      <Stack.Screen
        name={SCREENS.SETTINGS_HOME_SCREEN}
        component={SettingsHomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />

      {/* Other Settings Screens */}
      <Stack.Screen
        name={SCREENS.CREATE_SUB_USER_SCREEN}
        component={CreateSubUserScreen}
        options={{ headerShown: true, title: 'Create Sub User' }}
      />

      <Stack.Screen
        name={SCREENS.CHANGE_TPIN_SCREEN}
        component={ChangeTPINScreen}
        options={{ headerShown: true, title: 'Change TPIN' }}
      />

      <Stack.Screen
        name={SCREENS.MY_CERTIFICATE_SCREEN}
        component={MyCertificateScreen}
        options={{ headerShown: true, title: 'My Certificate' }}
      />

      <Stack.Screen
        name={SCREENS.LOW_BALANCE_ALERT_SCREEN}
        component={LowBalanceAlertScreen}
        options={{ headerShown: true, title: 'Low Balance Alert' }}
      />

      <Stack.Screen
        name={SCREENS.ID_CARD_SCREEN}
        component={IDCardScreen}
        options={{ headerShown: true, title: 'ID Card' }}
      />
    </Stack.Navigator>
  );
}