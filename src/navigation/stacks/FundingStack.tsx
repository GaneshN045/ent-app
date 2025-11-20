// navigation/stacks/FundingStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SCREENS from '../../constants/screens';

// Screens
import FundingHomeScreen from '../../screens/Funding/FundingHomeScreen';
import FundRequestScreen from '../../screens/Funding/FundRequestScreen';
import WalletToWalletScreen from '../../screens/Funding/WalletToWalletScreen';
import FundTransferScreen from '../../screens/Funding/FundTransferScreen';
import FundReversalScreen from '../../screens/Funding/FundReversalScreen';
import WalletToBankScreen from '../../screens/Funding/WalletToBankScreen';

// Custom Header (only for home)
import CustomHeader from '../../components/headers/CustomHeader';

const Stack = createStackNavigator();

export default function FundingStack({ navigation }: any) {
  // THIS LINE IS CRITICAL — Keeps Bottom Tab Bar visible on ALL screens
  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'flex' }, // Always show
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      {/* Home Screen — Custom Header */}
      <Stack.Screen
        name={SCREENS.FUNDING_HOME_SCREEN}
        component={FundingHomeScreen}
        options={{
          headerTitle: () => <CustomHeader />,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />

      {/* All Other Screens — Normal Header + Tab Bar Visible */}
      <Stack.Screen
        name={SCREENS.FUND_REQUEST_SCREEN}
        component={FundRequestScreen}
        options={{ title: 'Fund Request' }}
      />
      <Stack.Screen
        name={SCREENS.WALLET_TO_WALLET_SCREEN}
        component={WalletToWalletScreen}
        options={{ title: 'Wallet To Wallet' }}
      />
      <Stack.Screen
        name={SCREENS.FUND_TRANSFER_SCREEN}
        component={FundTransferScreen}
        options={{ title: 'Fund Transfer' }}
      />
      <Stack.Screen
        name={SCREENS.FUND_REVERSAL_SCREEN}
        component={FundReversalScreen}
        options={{ title: 'Fund Reversal' }}
      />
      <Stack.Screen
        name={SCREENS.WALLET_TO_BANK_SCREEN}
        component={WalletToBankScreen}
        options={{ title: 'Move To Bank' }}
      />
    </Stack.Navigator>
  );
}
