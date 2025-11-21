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
import type { RootState } from '../store/store';
import { getMenuForRole, Role } from './menuConfig';
import COLORS from '../constants/colors';
import SCREENS from '../constants/screens';

const Tab = createBottomTabNavigator();

/* ---------------------------------------------------------
   SHOW TAB BAR ONLY ON SPECIFIC MAIN SCREENS
   --------------------------------------------------------- */
function shouldShowTabBar(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  const allowed: string[] = [
    SCREENS.FUNDING_HOME_SCREEN,
    SCREENS.SETTINGS_HOME_SCREEN,
    SCREENS.PROFILE_HOME_SCREEN,
    SCREENS.PRODUCTS_HOME_SCREEN,
    SCREENS.DASHBOARD_HOME_SCREEN,
  ];

  return allowed.includes(routeName) || routeName === '';
}

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  const userRole = useAppSelector((state: RootState) => state.auth.user?.role || 'RT') as Role;
  const menuItems = getMenuForRole(userRole);

  const TABS = [
    {
      screen: SCREENS.DASHBOARD_STACK,
      component: DashboardHomeScreen,
      label: 'Dashboard',
      icon: 'widgets',
    },
    {
      screen: SCREENS.FUNDING_STACK,
      component: FundingStack,
      label: 'Funding',
      icon: 'account-balance-wallet',
    },
    {
      screen: SCREENS.PRODUCTS_STACK,
      component: ProductsStack,
      label: 'Products',
      icon: 'apps',
    },
    {
      screen: SCREENS.SETTINGS_STACK,
      component: SettingsStack,
      label: 'Settings',
      icon: 'settings',
    },
    {
      screen: SCREENS.PROFILE_STACK,
      component: ProfileStack,
      label: 'Profile',
      icon: 'person',
    },
  ];

  const allowedTabs = TABS.filter(
    tab => tab.screen === SCREENS.PROFILE_STACK || menuItems.some(m => m.screen === tab.screen),
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

            /* ---------- move Products label a little upward ---------- */
            tabBarLabelStyle:
              tab.screen === SCREENS.PRODUCTS_STACK
                ? { bottom: 0 } // ← adjust this value to taste
                : undefined,

            /* ---------------------------------------------------------
               ICON STYLE (Floating button for Products)
               --------------------------------------------------------- */
            tabBarIcon: ({ color, focused }: any) => {
              if (tab.screen === SCREENS.PRODUCTS_STACK) {
                return (
                  <View style={styles.floatingContainer}>
                    <View style={[styles.floatingButton, focused && styles.floatingButtonActive]}>
                      <View style={styles.iconContainer}>
                        <Icon
                          name={tab.icon}
                          size={36}
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
    top: -10,
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
    borderColor: 'white',
    borderTopColor: '#fff',
    // borderTopColor: 'gray',
    borderLeftColor: '#fff',
    // borderLeftColor: 'gray',
    transform: [{ rotate: '45deg' }],
    ...Platform.select({
      ios: {},
    }),
  },
  floatingButtonActive: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#fff',
    // borderColor: COLORS.PRIMARY_COLOR,
    transform: [{ rotate: '-135deg' }],
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-135deg' }],
  },
  regularIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
  },
});
