// navigation/stacks/ProductsStack.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsHomeScreen from '../../screens/Products/ProductsHomeScreen';
import CustomHeader from '../../components/headers/CustomHeader';
import SCREENS from '../../constants/screens';
import PGScreen from '../../screens/Products/pg/PGScreen';
import PayoutScreen from '../../screens/Products/payout/screens/PayoutScreen';
import DMTScreen from '../../screens/Products/dmt/screens/DMTScreen';
import AddRemitterScreen from '../../screens/Products/dmt/screens/AddRemitterScreen';
import MPOSScreen from '../../screens/Products/mpos/screens/MPOSScreen';
import AEPSOptionSelectionScreen from '../../screens/Products/aeps/screens/AEPSOptionSelectionScreen';
import AEPSScreen from '../../screens/Products/aeps/screens/AEPSScreen';
import BillPaymentScreen from '../../screens/Products/bill_payments/screens/BillPaymentScreen';
import PayScreen from '../../screens/Products/bill_payments/screens/PayScreen';

const Stack = createStackNavigator();

export default function ProductsStack() {
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
      {/* Products Home */}
      <Stack.Screen
        name={SCREENS.PRODUCTS_HOME_SCREEN}
        component={ProductsHomeScreen}
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />,
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />

      {/* PG SCREEN → receives option_type */}
      <Stack.Screen
        name={SCREENS.PG_SCREEN}
        component={PGScreen}
        options={{
          headerShown: true,
          headerTitle: 'Payment Gateway',
        }}
      />

      <Stack.Screen
        name={SCREENS.PAYOUT_SCREEN}
        component={PayoutScreen}
        options={{
          headerShown: true,
          headerTitle: 'Payout Screen',
        }}
      />

      <Stack.Screen
        name={SCREENS.DMT_SCREEN}
        component={DMTScreen}
        options={{
          headerShown: true,
          headerTitle: 'Payout Screen',
        }}
      />

      <Stack.Screen
        name={SCREENS.ADD_REMITTER_SCREEN}
        component={AddRemitterScreen}
        options={{
          headerShown: true,
          headerTitle: 'Add New Remitter',
        }}
      />

      <Stack.Screen
        name={SCREENS.MPOS_SCREEN}
        component={MPOSScreen}
        options={{
          headerShown: true,
          headerTitle: 'MPOS',
        }}
      />

      <Stack.Screen
        name={SCREENS.AEPS_OPTION_SELECTION}
        component={AEPSOptionSelectionScreen}
        options={{
          headerShown: true,
          headerTitle: 'AEPS Vendor Selection',
        }}
      />

      <Stack.Screen
        name={SCREENS.AEPS_SCREEN}
        component={AEPSScreen}
        options={{
          headerShown: true,
          headerTitle: 'AEPS',
        }}
      />

      <Stack.Screen
        name={SCREENS.BILL_PAYMENT_SCREEN}
        component={BillPaymentScreen}
        options={{
          headerShown: true,
          headerTitle: 'Bill Payment',
        }}
      />

      <Stack.Screen
        name={SCREENS.PAY_SCREEN}
        component={PayScreen}
        options={{
          headerShown: true,
          headerTitle: 'Pay the Payment',
        }}
      />
    </Stack.Navigator>
  );
}
