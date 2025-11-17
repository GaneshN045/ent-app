// navigation/stacks/SupportStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Imports
import SupportHomeScreen from '../../screens/Support/SupportHomeScreen';
import BioMetricDeviceScreen from '../../screens/Support/BioMetricDeviceScreen';
import TicketingScreen from '../../screens/Support/TicketingScreen';
import ContactUsScreen from '../../screens/Support/ContactUsScreen';
import TopUpRequestScreen from '../../screens/Support/TopUpRequestScreen';
import TopUpHistoryScreen from '../../screens/Support/TopUpHistoryScreen';
import AddMoneyScreen from '../../screens/Support/AddMoneyScreen';
import PaymentRequestScreen from '../../screens/Support/PaymentRequestScreen';
import PaymentHistoryScreen from '../../screens/Support/PaymentHistoryScreen';
import PaymentBanksScreen from '../../screens/Support/PaymentBanksScreen';
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function SupportStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name={SCREENS.SUPPORT_HOME_SCREEN}
        component={SupportHomeScreen}
        options={{ title: 'Support' }}
      />
      <Stack.Screen
        name={SCREENS.BIOMETRIC_DEVICE_SCREEN}
        component={BioMetricDeviceScreen}
        options={{ title: 'Bio Metric Device' }}
      />
      <Stack.Screen
        name={SCREENS.TICKETING_SCREEN}
        component={TicketingScreen}
        options={{ title: 'Ticketing System' }}
      />
      <Stack.Screen
        name={SCREENS.CONTACT_US_SCREEN}
        component={ContactUsScreen}
        options={{ title: 'Contact Us' }}
      />
      <Stack.Screen
        name={SCREENS.TOP_UP_REQUEST_SCREEN}
        component={TopUpRequestScreen}
        options={{ title: 'Top Up Request' }}
      />
      <Stack.Screen
        name={SCREENS.TOP_UP_HISTORY_SCREEN}
        component={TopUpHistoryScreen}
        options={{ title: 'Top Up History' }}
      />
      <Stack.Screen
        name={SCREENS.ADD_MONEY_SCREEN}
        component={AddMoneyScreen}
        options={{ title: 'Add Money' }}
      />
      <Stack.Screen
        name={SCREENS.PAYMENT_REQUEST_SCREEN}
        component={PaymentRequestScreen}
        options={{ title: 'Payment Request' }}
      />
      <Stack.Screen
        name={SCREENS.PAYMENT_HISTORY_SCREEN}
        component={PaymentHistoryScreen}
        options={{ title: 'Payment History' }}
      />
      <Stack.Screen
        name={SCREENS.PAYMENT_BANKS_SCREEN}
        component={PaymentBanksScreen}
        options={{ title: 'Payment Banks' }}
      />
    </Stack.Navigator>
  );
}