import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Role, getMenuForRole } from './menuConfig';
import BottomTabs from './BottomTabs';

import CustomDrawerContent from './CustomDrawerContent';
import { useAppSelector } from '../store/hooks';
import SupportStack from './stacks/SupportStack';
import ReportsStack from './stacks/ReportsStack';
import CommonStack from './stacks/CommonStack';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  const userRole: Role = useAppSelector(
    (state: any) => (state.auth.user?.role as Role) || 'RT'
  );

  const menuItems: any[] = getMenuForRole(userRole);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: any) => (
        <CustomDrawerContent {...props} menuItems={menuItems} />
      )}
    >
      {/* IMPORTANT: THIS IS YOUR MAIN SCREEN NAME */}
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="SupportStack"
        component={SupportStack}
      />
      <Drawer.Screen
        name="ReportsStack"
        component={ReportsStack}
      />
      <Drawer.Screen
        name="CommonStack"
        component={CommonStack}
      />
    </Drawer.Navigator>
  );
}
