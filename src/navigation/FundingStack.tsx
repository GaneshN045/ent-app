import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FundingStackParamList } from "./types";
import FundingHomeScreen from "../screens/Funding/FundingHomeScreen";
import FundRequestScreen from "../screens/Funding/FundRequestScreen";
import WalletToWalletScreen from "../screens/Funding/WalletToWalletScreen";
import FundTransferScreen from "../screens/Funding/FundTransferScreen";
import FundReversalScreen from "../screens/Funding/FundReversalScreen";
import WalletToBankScreen from "../screens/Funding/WalletToBankScreen";

const Stack = createStackNavigator<FundingStackParamList>();

export default function FundingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="FundingHomeScreen"
        component={FundingHomeScreen}
        options={{ title: "Funding" }}
      />
      <Stack.Screen
        name="FundRequestScreen"
        component={FundRequestScreen}
        options={{ title: "Fund Request" }}
      />
      <Stack.Screen
        name="WalletToWalletScreen"
        component={WalletToWalletScreen}
        options={{ title: "Wallet To Wallet" }}
      />
      <Stack.Screen
        name="FundTransferScreen"
        component={FundTransferScreen}
        options={{ title: "Fund Transfer" }}
      />
      <Stack.Screen
        name="FundReversalScreen"
        component={FundReversalScreen}
        options={{ title: "Fund Reversal" }}
      />
      <Stack.Screen
        name="WalletToBankScreen"
        component={WalletToBankScreen}
        options={{ title: "Move To Bank" }}
      />
    </Stack.Navigator>
  );
}

