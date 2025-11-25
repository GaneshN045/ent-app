import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Role, getMenuForRole } from './menuConfig';
import BottomTabs from './BottomTabs';

import CustomDrawerContent from './CustomDrawerContent';
import SupportStack from './stacks/SupportStack';
import ReportsStack from './stacks/ReportsStack';
import CommonStack from './stacks/CommonStack';
import SCREENS from '../constants/screens';
import ManageUserStack from './ManageUserStack';
import { useUserRole } from '../hooks/useUserRole';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  const userRole: Role = useUserRole();
  const menuItems: any[] = getMenuForRole(userRole);

  const hasMenuScreen = (screen: string) => menuItems.some(item => item.screen === screen);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} menuItems={menuItems} />}
    >
      {/* IMPORTANT: THIS IS YOUR MAIN SCREEN NAME */}
      <Drawer.Screen
        name={SCREENS.BOTTOM_STACK}
        component={BottomTabs}
        options={{
          drawerLabel: 'Dashboard',
        }}
      />
      {hasMenuScreen(SCREENS.SUPPORT_STACK) && (
        <Drawer.Screen name={SCREENS.SUPPORT_STACK} component={SupportStack} />
      )}
      {hasMenuScreen(SCREENS.REPORTS_STACK) && (
        <Drawer.Screen name={SCREENS.REPORTS_STACK} component={ReportsStack} />
      )}
      {hasMenuScreen(SCREENS.MANAGE_USER_STACK) && (
        <Drawer.Screen name={SCREENS.MANAGE_USER_STACK} component={ManageUserStack} />
      )}
      <Drawer.Screen name={SCREENS.COMMON_STACK} component={CommonStack} />
    </Drawer.Navigator>
  );
}
