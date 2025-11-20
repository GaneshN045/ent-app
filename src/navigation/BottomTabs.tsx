import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, StyleSheet, Platform } from 'react-native';

import DashboardHomeScreen from '../screens/Dashboard/DashboardHomeScreen';
import FundingStack from './stacks/FundingStack';
import SettingsStack from './stacks/SettingsStack';
import ProfileStack from './stacks/ProfileStack';
import ProductsStack from './stacks/ProductsStack';

import { useAppSelector } from '../store/hooks';
import { getMenuForRole, Role } from './menuConfig';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

/* ---------------------------------------------------------
   SHOW TAB BAR ONLY ON SPECIFIC MAIN SCREENS
   --------------------------------------------------------- */
function shouldShowTabBar(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  const allowed = [
    'FUNDING_HOME_SCREEN',
    'SETTINGS_HOME_SCREEN',
    'PROFILE_HOME_SCREEN',
    'PRODUCTS_HOME_SCREEN',
    'DashboardHomeScreen',
  ];

  return allowed.includes(routeName) || routeName === '';
}

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  const userRole = useAppSelector(state => state.auth.user?.role || 'RT') as Role;
  const menuItems = getMenuForRole(userRole);

  const TABS = [
    {
      screen: 'DashboardStack',
      component: DashboardHomeScreen,
      label: 'Dashboard',
      icon: 'widgets',
    },
    {
      screen: 'FundingStack',
      component: FundingStack,
      label: 'Funding',
      icon: 'account-balance-wallet',
    },
    {
      screen: 'ProductsStack',
      component: ProductsStack,
      label: 'Products',
      icon: 'apps',
    },
    {
      screen: 'SettingsStack',
      component: SettingsStack,
      label: 'Settings',
      icon: 'settings',
    },
    {
      screen: 'ProfileStack',
      component: ProfileStack,
      label: 'Profile',
      icon: 'person',
    },
  ];

  const allowedTabs = TABS.filter(
    tab => tab.screen === 'ProfileStack' || menuItems.some(m => m.screen === tab.screen),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      {allowedTabs.map(tab => (
        <Tab.Screen
          key={tab.screen}
          name={tab.screen}
          component={tab.component}
          options={({ route }: any) => ({
            tabBarLabel: tab.label,

            /* ---------------------------------------------------------
               ICON STYLE (Floating button for Products)
               --------------------------------------------------------- */
            tabBarIcon: ({ color, focused }: any) => {
              if (tab.screen === 'ProductsStack') {
                return (
                  <View style={styles.floatingContainer}>
                    <View style={[styles.floatingButton, focused && styles.floatingButtonActive]}>
                      <View style={styles.iconContainer}>
                        <Icon
                          name={tab.icon}
                          size={30}
                          color={focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_ICON}
                        />
                      </View>
                    </View>
                  </View>
                );
              }

              return (
                <View style={styles.regularIconContainer}>
                  <Icon name={tab.icon} size={24} color={color} />
                </View>
              );
            },

            /* ---------------------------------------------------------
               SHOW/HIDE TAB BAR BASED ON SCREEN
               --------------------------------------------------------- */
            tabBarStyle: shouldShowTabBar(route)
              ? {
                  paddingBottom: insets.bottom + 8,
                  paddingTop: 8,
                  height: 70 + insets.bottom,
                  backgroundColor: '#ffffff',
                  borderTopWidth: 0,
                  elevation: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  position: 'absolute',
                }
              : { display: 'none' },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}

/* ---------------------------------------------------------
   STYLES
   --------------------------------------------------------- */
const styles = StyleSheet.create({
  floatingContainer: {
    position: 'relative',
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  floatingButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: { elevation: 6 },
    }),
  },
  floatingButtonActive: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: COLORS.PRIMARY_COLOR,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regularIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
  },
});
