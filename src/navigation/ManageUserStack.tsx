import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ManageUserStackParamList } from "./types";
import ManageUserHomeScreen from "../screens/ManageUser/ManageUserHomeScreen";
import CreateUserScreen from "../screens/ManageUser/CreateUserScreen";
import DebitCreditUserScreen from "../screens/ManageUser/DebitCreditUserScreen";
import ViewUserScreen from "../screens/ManageUser/ViewUserScreen";

const Stack = createStackNavigator<ManageUserStackParamList>();

export default function ManageUserStack() {
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
        name="ManageUserHomeScreen"
        component={ManageUserHomeScreen}
        options={{ title: "Manage User" }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ title: "Create User" }}
      />
      <Stack.Screen
        name="DebitCreditUserScreen"
        component={DebitCreditUserScreen}
        options={{ title: "Debit & Credit User" }}
      />
      <Stack.Screen
        name="ViewUserScreen"
        component={ViewUserScreen}
        options={{ title: "View User" }}
      />
    </Stack.Navigator>
  );
}

