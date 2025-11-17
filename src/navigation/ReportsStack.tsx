import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ReportsStackParamList } from "./types";
import ReportsHomeScreen from "../screens/Reports/ReportsHomeScreen";
import CommissionChargesScreen from "../screens/Reports/CommissionChargesScreen";
import WalletReportScreen from "../screens/Reports/WalletReportScreen";
import NetworkTransactionScreen from "../screens/Reports/NetworkTransactionScreen";
import SearchTransactionScreen from "../screens/Reports/SearchTransactionScreen";
import FundLoadingScreen from "../screens/Reports/FundLoadingScreen";
import PendingTransactionScreen from "../screens/Reports/PendingTransactionScreen";
import DebitHistoryScreen from "../screens/Reports/DebitHistoryScreen";
import DownLineBalanceScreen from "../screens/Reports/DownLineBalanceScreen";

const Stack = createStackNavigator<ReportsStackParamList>();

export default function ReportsStack() {
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
        name="ReportsHomeScreen"
        component={ReportsHomeScreen}
        options={{ title: "Reports" }}
      />
      <Stack.Screen
        name="CommissionChargesScreen"
        component={CommissionChargesScreen}
        options={{ title: "Commission & Charges" }}
      />
      <Stack.Screen
        name="WalletReportScreen"
        component={WalletReportScreen}
        options={{ title: "Wallet Report" }}
      />
      <Stack.Screen
        name="NetworkTransactionScreen"
        component={NetworkTransactionScreen}
        options={{ title: "Network Transaction" }}
      />
      <Stack.Screen
        name="SearchTransactionScreen"
        component={SearchTransactionScreen}
        options={{ title: "Search Transaction" }}
      />
      <Stack.Screen
        name="FundLoadingScreen"
        component={FundLoadingScreen}
        options={{ title: "Fund Loading" }}
      />
      <Stack.Screen
        name="PendingTransactionScreen"
        component={PendingTransactionScreen}
        options={{ title: "Pending Transaction" }}
      />
      <Stack.Screen
        name="DebitHistoryScreen"
        component={DebitHistoryScreen}
        options={{ title: "Debit History" }}
      />
      <Stack.Screen
        name="DownLineBalanceScreen"
        component={DownLineBalanceScreen}
        options={{ title: "Down Line Balance" }}
      />
    </Stack.Navigator>
  );
}

