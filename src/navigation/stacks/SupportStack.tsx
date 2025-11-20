// navigation/stacks/SupportStack.tsx

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SupportHomeScreen from '../../screens/Support/SupportHomeScreen';
import BioMetricDeviceScreen from '../../screens/Support/BioMetricDeviceScreen';
import TicketingScreen from '../../screens/Support/TicketingScreen';
import ContactUsScreen from '../../screens/Support/ContactUsScreen';

import SCREENS from '../../constants/screens';

const Stack = createStackNavigator();

export default function SupportStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }: any) => ({
        headerShown: true,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },

        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 15 }}>
            <Icon name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
        ),
      })}
    >
      {/* <Stack.Screen
        name={SCREENS.SUPPORT_HOME_SCREEN}
        component={SupportHomeScreen}
        options={({ navigation }: any) => ({
          title: 'Support',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREENS.BOTTOM_STACK, { screen: SCREENS.DASHBOARD_STACK })
              }
              style={{ paddingHorizontal: 15 }}
            >
              <Icon name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
          ),
        })}
      /> */}

      <Stack.Screen
        name={SCREENS.BIOMETRIC_DEVICE_SCREEN}
        component={BioMetricDeviceScreen}
        options={{ title: 'Bio Metric Device' }}
      />

      <Stack.Screen
        name={SCREENS.TICKETING_SCREEN}
        component={TicketingScreen}
        options={{ title: 'Ticketing' }}
      />

      <Stack.Screen
        name={SCREENS.CONTACT_US_SCREEN}
        component={ContactUsScreen}
        options={{ title: 'Contact Us' }}
      />
    </Stack.Navigator>
  );
}
