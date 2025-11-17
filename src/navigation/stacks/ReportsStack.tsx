// navigation/stacks/ReportsStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screen Components
import ReportsHomeScreen from '../../screens/Reports/ReportsHomeScreen';
import CommissionChargesScreen from '../../screens/Reports/CommissionChargesScreen';
import WalletReportScreen from '../../screens/Reports/WalletReportScreen';
import NetworkTransactionScreen from '../../screens/Reports/NetworkTransactionScreen';
import SearchTransactionScreen from '../../screens/Reports/SearchTransactionScreen';
import FundLoadingScreen from '../../screens/Reports/FundLoadingScreen';
import PendingTransactionScreen from '../../screens/Reports/PendingTransactionScreen';
import DebitHistoryScreen from '../../screens/Reports/DebitHistoryScreen';
import DownLineBalanceScreen from '../../screens/Reports/DownLineBalanceScreen';

// Custom Header
import CustomHeader from '../../components/headers/CustomHeader';
import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function ReportsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      {/* Reports Home with Custom Header */}
      <Stack.Screen
        name={SCREENS.REPORTS_HOME_SCREEN}
        component={ReportsHomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />

      <Stack.Screen
        name={SCREENS.COMMISSION_CHARGES_SCREEN}
        component={CommissionChargesScreen}
        options={{ headerShown: true, title: 'Commission & Charges' }}
      />

      <Stack.Screen
        name={SCREENS.WALLET_REPORT_SCREEN}
        component={WalletReportScreen}
        options={{ headerShown: true, title: 'Wallet Report' }}
      />

      <Stack.Screen
        name={SCREENS.NETWORK_TRANSACTION_SCREEN}
        component={NetworkTransactionScreen}
        options={{ headerShown: true, title: 'Network Transaction' }}
      />

      <Stack.Screen
        name={SCREENS.SEARCH_TRANSACTION_SCREEN}
        component={SearchTransactionScreen}
        options={{ headerShown: true, title: 'Search Transaction' }}
      />

      <Stack.Screen
        name={SCREENS.FUND_LOADING_SCREEN}
        component={FundLoadingScreen}
        options={{ headerShown: true, title: 'Fund Loading' }}
      />

      <Stack.Screen
        name={SCREENS.PENDING_TRANSACTION_SCREEN}
        component={PendingTransactionScreen}
        options={{ headerShown: true, title: 'Pending Transaction' }}
      />

      <Stack.Screen
        name={SCREENS.DEBIT_HISTORY_SCREEN}
        component={DebitHistoryScreen}
        options={{ headerShown: true, title: 'Debit History' }}
      />

      <Stack.Screen
        name={SCREENS.DOWNLINE_BALANCE_SCREEN}
        component={DownLineBalanceScreen}
        options={{ headerShown: true, title: 'Down Line Balance' }}
      />
    </Stack.Navigator>
  );
}