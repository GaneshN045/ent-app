import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import DashboardHomeScreen from '../screens/Dashboard/DashboardHomeScreen';
import FundingStack from './stacks/FundingStack';
import ReportsStack from './stacks/ReportsStack';
import SettingsStack from './stacks/SettingsStack';
import { useAppSelector } from '../store/hooks';
import { getMenuForRole, Role } from './menuConfig';
import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import COLORS from '../constants/colors';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  
  const insets = useSafeAreaInsets();
  type IconName = keyof typeof MaterialIconsGlyphs;
  const userRole = useAppSelector(state => state.auth.user?.role || 'RT') as Role;
  const menuItems = getMenuForRole(userRole);

  // Dynamic Tabs Array
  const TABS: {
    screen: string;
    component: any;
    label: string;
    icon: IconName;
  }[] = [
    {
      screen: 'DashboardStack',
      component: DashboardHomeScreen,
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      screen: 'FundingStack',
      component: FundingStack,
      label: 'Funding',
      icon: 'account-balance-wallet',
    },
    // {
    //   screen: 'ReportsStack',
    //   component: ReportsStack,
    //   label: 'Reports',
    //   icon: 'assessment',
    // },
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

  // Filter by user allowed menu
  const allowedTabs = TABS.filter(tab => tab.screen === "ProfileStack" || menuItems.some(m => m.screen === tab.screen));

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: insets.bottom + 10,
          paddingTop: 5,
          minHeight: 60,
        },
        tabBarLabelStyle: {
          marginBottom: 6,
        },
      }}
    >
      {allowedTabs.map(tab => (
        <Tab.Screen
          key={tab.screen}
          name={tab.screen}
          component={tab.component}
          options={({ route }: any) => ({
            tabBarLabel: tab.label,
            tabBarIcon: ({ color, size }: any) => (
              <Icon name={tab.icon} size={size} color={color} />
            ),
            // Hide tab bar when navigating away from home screens in stacks
            tabBarStyle: (() => {
              const routeName = getFocusedRouteNameFromRoute(route);
              return {
                paddingBottom: insets.bottom + 10,
                paddingTop: 5,
                minHeight: 60,
              };
            })(),
          })}
        />
      ))}
    </Tab.Navigator>
  );
}