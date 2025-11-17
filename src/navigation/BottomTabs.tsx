import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";
import DashboardHomeScreen from "../screens/Dashboard/DashboardHomeScreen";
import FundingStack from "./FundingStack";
import ReportsStack from "./ReportsStack";
import SettingsStack from "./SettingsStack";
import { useAppSelector } from "../store/hooks";
import { getMenuForRole, Role } from "./menuConfig";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const userRole = useAppSelector(
    (state) => state.auth.user?.role || "RT"
  ) as Role;

  const menuItems = getMenuForRole(userRole);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 4,
          shadowOpacity: 0.1,
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#2196f3",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          elevation: 8,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardHomeScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }}
      />
      {menuItems.some((item) => item.screen === "FundingStack") && (
        <Tab.Screen
          name="FundingTab"
          component={FundingStack}
          options={{
            tabBarLabel: "Funding",
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-balance-wallet" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "ReportsStack") && (
        <Tab.Screen
          name="ReportsTab"
          component={ReportsStack}
          options={{
            tabBarLabel: "Reports",
            tabBarIcon: ({ color, size }) => (
              <Icon name="assessment" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "SettingsStack") && (
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStack}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" size={size} color={color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

