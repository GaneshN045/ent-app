// navigation/stacks/ProductsStack.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsHomeScreen from "../../screens/Products/ProductsHomeScreen";
import CustomHeader from "../../components/headers/CustomHeader";
import SCREENS from "../../constants/screens";
import PGScreen from "../../screens/Products/pg/PGScreen";
import PayoutScreen from "../../screens/Products/payout/screens/PayoutScreen";

const Stack = createStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
        headerTitleStyle: { fontWeight: "bold" },
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
          headerTitle: "Payment Gateway"
        }}
      />

      <Stack.Screen
        name={SCREENS.PAYOUT_SCREEN}
        component={PayoutScreen}
        options={{
          headerShown: true,
          headerTitle: "Payout Screen"
        }}
      />

    </Stack.Navigator>
  );
}
