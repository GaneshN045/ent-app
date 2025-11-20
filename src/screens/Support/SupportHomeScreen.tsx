import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreenButton from '../../components/buttons/HomeScreenButton';
import SCREENS from '../../constants/screens';
import '../../../global.css';
import { useAppSelector } from '../../store/hooks';
import { Role, canAccess, allMenuItems } from '../../navigation/menuConfig';

type SupportNavProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function SupportHomeScreen() {
  const navigation = useNavigation<SupportNavProp>();
  const userRole = (useAppSelector(state => state.auth.user?.role) || 'RT') as Role;

  const supportMenu = allMenuItems.find(item => item.screen === 'SupportStack');

  const menuItems = (supportMenu?.subItems || [])
    .filter(sub => canAccess(sub.roles, userRole))
    .map(sub => ({
      title: sub.name,
      icon:
        sub.screen === SCREENS.BIOMETRIC_DEVICE_SCREEN
          ? 'fingerprint'
          : sub.screen === SCREENS.TICKETING_SCREEN
            ? 'support-agent'
            : sub.screen === SCREENS.CONTACT_US_SCREEN
              ? 'contact-mail'
              : sub.screen === SCREENS.TOP_UP_REQUEST_SCREEN
                ? 'add-circle'
                : sub.screen === SCREENS.TOP_UP_HISTORY_SCREEN
                  ? 'history'
                  : sub.screen === SCREENS.ADD_MONEY_SCREEN
                    ? 'currency-rupee'
                    : sub.screen === SCREENS.PAYMENT_REQUEST_SCREEN
                      ? 'payment'
                      : sub.screen === SCREENS.PAYMENT_HISTORY_SCREEN
                        ? 'history'
                        : sub.screen === SCREENS.PAYMENT_BANKS_SCREEN
                          ? 'account-balance'
                          : 'help-outline',
      subtitle:
        sub.screen === SCREENS.BIOMETRIC_DEVICE_SCREEN
          ? 'Manage device'
          : sub.screen === SCREENS.TICKETING_SCREEN
            ? 'Raise a ticket'
            : sub.screen === SCREENS.CONTACT_US_SCREEN
              ? 'Get support'
              : sub.screen === SCREENS.TOP_UP_REQUEST_SCREEN
                ? 'Add credits'
                : sub.screen === SCREENS.TOP_UP_HISTORY_SCREEN
                  ? 'View history'
                  : sub.screen === SCREENS.ADD_MONEY_SCREEN
                    ? 'funds'
                    : sub.screen === SCREENS.PAYMENT_REQUEST_SCREEN
                      ? 'Make request'
                      : sub.screen === SCREENS.PAYMENT_HISTORY_SCREEN
                        ? 'View history'
                        : sub.screen === SCREENS.PAYMENT_BANKS_SCREEN
                          ? 'Bank details'
                          : '',
      screen: sub.screen as keyof typeof SCREENS,
    }));

  return (
    <ScrollView className="flex-1 bg-[#F7F8FA] px-5 pt-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-[#34343A] mb-5">Support</Text>

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between">
        {menuItems.map((item, index) => (
          <HomeScreenButton
            key={index}
            title={item.title}
            icon={item.icon}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
