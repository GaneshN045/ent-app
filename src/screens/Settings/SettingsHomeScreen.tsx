// screens/Settings/SettingsHomeScreen.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../../constants/screens';
import '../../../global.css';
import HomeScreenButton from '../../components/buttons/HomeScreenButton';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store/store';
import { Role, canAccess, allMenuItems } from '../../navigation/menuConfig';

type SettingsNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function SettingsHomeScreen() {
  const navigation = useNavigation<SettingsNavigationProp>();
  const userRole = (useAppSelector((state: RootState) => state.auth.user?.role) || 'RT') as Role;

  const settingsMenu = allMenuItems.find(item => item.screen === 'SettingsStack');

  const menuItems = (settingsMenu?.subItems || [])
    .filter(sub => canAccess(sub.roles, userRole))
    .map(sub => ({
      title: sub.name,
      // simple icon mapping; keep existing icons for known screens
      icon:
        sub.screen === SCREENS.CHANGE_TPIN_SCREEN
          ? 'lock'
          : sub.screen === SCREENS.MY_CERTIFICATE_SCREEN
            ? 'verified'
            : sub.screen === SCREENS.LOW_BALANCE_ALERT_SCREEN
              ? 'notifications-active'
              : sub.screen === SCREENS.ID_CARD_SCREEN
                ? 'badge'
                : 'settings',
      subtitle:
        sub.screen === SCREENS.CHANGE_TPIN_SCREEN
          ? 'Manage TPIN'
          : sub.screen === SCREENS.MY_CERTIFICATE_SCREEN
            ? 'View certificate'
            : sub.screen === SCREENS.LOW_BALANCE_ALERT_SCREEN
              ? 'Configure alerts'
              : sub.screen === SCREENS.ID_CARD_SCREEN
                ? 'View ID'
                : '',
      screen: sub.screen as keyof typeof SCREENS,
    }));

  return (
    <View className="flex-1 bg-[#F7F8FA] px-5 pt-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-[#34343A] mb-5">Settings</Text>

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
    </View>
  );
}
