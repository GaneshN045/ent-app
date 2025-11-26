// navigation/stacks/ReportsStack.tsx

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screen Imports
import ReportsHomeScreen from '../../screens/Reports/ReportsHomeScreen';
import WalletReportScreen from '../../screens/Reports/WalletReportScreen';
import NetworkTransactionScreen from '../../screens/Reports/NetworkTransactionScreen';
import SearchTransactionScreen from '../../screens/Reports/SearchTransactionScreen';
import FundLoadingScreen from '../../screens/Reports/FundLoadingScreen';
import PendingTransactionScreen from '../../screens/Reports/PendingTransactionScreen';
import DebitHistoryScreen from '../../screens/Reports/DebitHistoryScreen';
import DownLineBalanceScreen from '../../screens/Reports/DownLineBalanceScreen';

import SCREENS from '../../constants/screens';
import CommissionAndCharges from '../../screens/Reports/commission_charges/CommissionAndCharges';

const Stack = createStackNavigator();

export default function ReportsStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.COMMISSION_CHARGES_SCREEN}
      screenOptions={({ navigation }: any) => ({
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },

        // Default back button for all inner screens
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 15 }}>
            <Icon name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
        ),
      })}
    >
      {/* Reports Home Screen with custom back button */}
      <Stack.Screen
        name={SCREENS.REPORTS_HOME_SCREEN}
        component={ReportsHomeScreen}
        options={({ navigation }: any) => ({
          title: 'Reports',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREENS.BOTTOM_STACK, { screen: SCREENS.DASHBOARD_STACK })
              }
              style={{ paddingHorizontal: 15 }}
            >
              <Icon name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name={SCREENS.COMMISSION_CHARGES_SCREEN}
        component={CommissionAndCharges}
        options={{ title: 'Commission & Charges' }}
      />

      <Stack.Screen
        name={SCREENS.WALLET_REPORT_SCREEN}
        component={WalletReportScreen}
        options={{ title: 'Wallet Report' }}
      />

      <Stack.Screen
        name={SCREENS.NETWORK_TRANSACTION_SCREEN}
        component={NetworkTransactionScreen}
        options={{ title: 'Network Transaction' }}
      />

      <Stack.Screen
        name={SCREENS.SEARCH_TRANSACTION_SCREEN}
        component={SearchTransactionScreen}
        options={{ title: 'Search Transaction' }}
      />

      <Stack.Screen
        name={SCREENS.FUND_LOADING_SCREEN}
        component={FundLoadingScreen}
        options={{ title: 'Fund Loading' }}
      />

      <Stack.Screen
        name={SCREENS.PENDING_TRANSACTION_SCREEN}
        component={PendingTransactionScreen}
        options={{ title: 'Pending Transaction' }}
      />

      <Stack.Screen
        name={SCREENS.DEBIT_HISTORY_SCREEN}
        component={DebitHistoryScreen}
        options={{ title: 'Debit History' }}
      />

      <Stack.Screen
        name={SCREENS.DOWNLINE_BALANCE_SCREEN}
        component={DownLineBalanceScreen}
        options={{ title: 'Down Line Balance' }}
      />
    </Stack.Navigator>
  );
}
