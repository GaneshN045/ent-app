import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SupportStackParamList } from "./types";
import SupportHomeScreen from "../screens/Support/SupportHomeScreen";
import BioMetricDeviceScreen from "../screens/Support/BioMetricDeviceScreen";
import TicketingScreen from "../screens/Support/TicketingScreen";
import ContactUsScreen from "../screens/Support/ContactUsScreen";
import TopUpRequestScreen from "../screens/Support/TopUpRequestScreen";
import TopUpHistoryScreen from "../screens/Support/TopUpHistoryScreen";
import AddMoneyScreen from "../screens/Support/AddMoneyScreen";
import PaymentRequestScreen from "../screens/Support/PaymentRequestScreen";
import PaymentHistoryScreen from "../screens/Support/PaymentHistoryScreen";
import PaymentBanksScreen from "../screens/Support/PaymentBanksScreen";

const Stack = createStackNavigator<SupportStackParamList>();

export default function SupportStack() {
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
        name="SupportHomeScreen"
        component={SupportHomeScreen}
        options={{ title: "Support" }}
      />
      <Stack.Screen
        name="BioMetricDeviceScreen"
        component={BioMetricDeviceScreen}
        options={{ title: "Bio Metric Device" }}
      />
      <Stack.Screen
        name="TicketingScreen"
        component={TicketingScreen}
        options={{ title: "Ticketing System" }}
      />
      <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{ title: "Contact Us" }}
      />
      <Stack.Screen
        name="TopUpRequestScreen"
        component={TopUpRequestScreen}
        options={{ title: "Top Up Request" }}
      />
      <Stack.Screen
        name="TopUpHistoryScreen"
        component={TopUpHistoryScreen}
        options={{ title: "Top Up History" }}
      />
      <Stack.Screen
        name="AddMoneyScreen"
        component={AddMoneyScreen}
        options={{ title: "Add Money" }}
      />
      <Stack.Screen
        name="PaymentRequestScreen"
        component={PaymentRequestScreen}
        options={{ title: "Payment Request" }}
      />
      <Stack.Screen
        name="PaymentHistoryScreen"
        component={PaymentHistoryScreen}
        options={{ title: "Payment History" }}
      />
      <Stack.Screen
        name="PaymentBanksScreen"
        component={PaymentBanksScreen}
        options={{ title: "Payment Banks" }}
      />
    </Stack.Navigator>
  );
}

