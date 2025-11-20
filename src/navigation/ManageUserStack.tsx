import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ManageUserStackParamList } from './types';
import ManageUserHomeScreen from '../screens/ManageUser/ManageUserHomeScreen';
import CreateUserScreen from '../screens/ManageUser/CreateUserScreen';
import DebitCreditUserScreen from '../screens/ManageUser/DebitCreditUserScreen';
import ViewUserScreen from '../screens/ManageUser/ViewUserScreen';
import SCREENS from '../constants/screens';

const Stack = createStackNavigator<ManageUserStackParamList>();

export default function ManageUserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name={SCREENS.MANAGE_USER_HOME_SCREEN}
        component={ManageUserHomeScreen}
        options={{ title: 'Manage User' }}
      />
      <Stack.Screen
        name={SCREENS.CREATE_USER_SCREEN}
        component={CreateUserScreen}
        options={{ title: 'Create User' }}
      />
      <Stack.Screen
        name={SCREENS.DEBIT_CREDIT_USER_SCREEN}
        component={DebitCreditUserScreen}
        options={{ title: 'Debit & Credit User' }}
      />
      <Stack.Screen
        name={SCREENS.VIEW_USER_SCREEN}
        component={ViewUserScreen}
        options={{ title: 'View User' }}
      />
    </Stack.Navigator>
  );
}
