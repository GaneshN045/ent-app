import React from "react";
import { TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";
import { MainDrawerParamList } from "./types";
import { getMenuForRole, Role } from "./menuConfig";
import BottomTabs from "./BottomTabs";
import ManageUserStack from "./ManageUserStack";
import ProductsScreen from "../screens/Products/ProductsScreen";
import FundingStack from "./FundingStack";
import SettingsStack from "./SettingsStack";
import SupportStack from "./SupportStack";
import ReportsStack from "./ReportsStack";
import CustomDrawerContent from "./CustomDrawerContent";
import { useAppSelector } from "../store/hooks";

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function MainDrawer() {
  // Get user role from Redux store (you'll need to set this up)
  const userRole = useAppSelector(
    (state) => state.auth.user?.role || "RT"
  ) as Role;

  const menuItems = getMenuForRole(userRole);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} menuItems={menuItems} />
      )}
      screenOptions={({ navigation }) => ({
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
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15, padding: 5 }}
          >
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
        ),
        drawerType: "slide",
        drawerStyle: {
          width: 280,
          backgroundColor: "#fff",
        },
        drawerActiveTintColor: "#2196f3",
        drawerInactiveTintColor: "#666",
        swipeEnabled: true,
        gestureEnabled: true,
      })}
    >
      <Drawer.Screen
        name="DashboardHomeScreen"
        component={BottomTabs}
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }}
      />
      {menuItems.some((item) => item.screen === "ManageUserStack") && (
        <Drawer.Screen
          name="ManageUserStack"
          component={ManageUserStack}
          options={{
            drawerLabel: "Manage User",
            drawerIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "ProductsScreen") && (
        <Drawer.Screen
          name="ProductsScreen"
          component={ProductsScreen}
          options={{
            drawerLabel: "Products",
            drawerIcon: ({ color, size }) => (
              <Icon name="inventory" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "FundingStack") && (
        <Drawer.Screen
          name="FundingStack"
          component={FundingStack}
          options={{
            drawerLabel: "Funding",
            drawerIcon: ({ color, size }) => (
              <Icon name="account-balance-wallet" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "SettingsStack") && (
        <Drawer.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color, size }) => (
              <Icon name="settings" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "SupportStack") && (
        <Drawer.Screen
          name="SupportStack"
          component={SupportStack}
          options={{
            drawerLabel: "Support",
            drawerIcon: ({ color, size }) => (
              <Icon name="support-agent" size={size} color={color} />
            ),
          }}
        />
      )}
      {menuItems.some((item) => item.screen === "ReportsStack") && (
        <Drawer.Screen
          name="ReportsStack"
          component={ReportsStack}
          options={{
            drawerLabel: "Reports",
            drawerIcon: ({ color, size }) => (
              <Icon name="assessment" size={size} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

