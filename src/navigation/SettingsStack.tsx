import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsStackParamList } from "./types";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import CreateSubUserScreen from "../screens/Settings/CreateSubUserScreen";
import ChangeTPINScreen from "../screens/Settings/ChangeTPINScreen";
import MyCertificateScreen from "../screens/Settings/MyCertificateScreen";
import LowBalanceAlertScreen from "../screens/Settings/LowBalanceAlertScreen";
import IDCardScreen from "../screens/Settings/IDCardScreen";

const Stack = createStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
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
        name="SettingsHomeScreen"
        component={SettingsHomeScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="CreateSubUserScreen"
        component={CreateSubUserScreen}
        options={{ title: "Create Sub User" }}
      />
      <Stack.Screen
        name="ChangeTPINScreen"
        component={ChangeTPINScreen}
        options={{ title: "Change TPIN" }}
      />
      <Stack.Screen
        name="MyCertificateScreen"
        component={MyCertificateScreen}
        options={{ title: "My Certificate" }}
      />
      <Stack.Screen
        name="LowBalanceAlertScreen"
        component={LowBalanceAlertScreen}
        options={{ title: "Low Balance Alert" }}
      />
      <Stack.Screen
        name="IDCardScreen"
        component={IDCardScreen}
        options={{ title: "ID Card" }}
      />
    </Stack.Navigator>
  );
}

