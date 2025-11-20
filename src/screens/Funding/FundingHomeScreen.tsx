// screens/Funding/FundingHomeScreen.tsx

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../../constants/screens';
import '../../../global.css';
import HomeScreenButton from '../../components/buttons/HomeScreenButton';
import { useAppSelector } from '../../store/hooks';
import { Role, canAccess, allMenuItems } from '../../navigation/menuConfig';

type FundingNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function FundingHomeScreen() {
  const navigation = useNavigation<FundingNavigationProp>();
  const userRole = (useAppSelector(state => state.auth.user?.role) || 'RT') as Role;

  const fundingMenu = allMenuItems.find(item => item.screen === 'FundingStack');

  const menuItems = (fundingMenu?.subItems || [])
    .filter(sub => canAccess(sub.roles, userRole))
    .map(sub => ({
      title: sub.name,
      icon:
        sub.screen === SCREENS.FUND_REQUEST_SCREEN
          ? 'request-quote'
          : sub.screen === SCREENS.WALLET_TO_WALLET_SCREEN
            ? 'swap-horiz'
            : sub.screen === SCREENS.FUND_TRANSFER_SCREEN
              ? 'send'
              : sub.screen === SCREENS.FUND_REVERSAL_SCREEN
                ? 'history'
                : sub.screen === SCREENS.WALLET_TO_BANK_SCREEN
                  ? 'account-balance'
                  : 'account-balance-wallet',
      subtitle:
        sub.screen === SCREENS.FUND_REQUEST_SCREEN
          ? 'Manage fund'
          : sub.screen === SCREENS.WALLET_TO_WALLET_SCREEN
            ? 'Transfer wallet'
            : sub.screen === SCREENS.FUND_TRANSFER_SCREEN
              ? 'Send funds'
              : sub.screen === SCREENS.FUND_REVERSAL_SCREEN
                ? 'Reverse fund'
                : sub.screen === SCREENS.WALLET_TO_BANK_SCREEN
                  ? 'Bank transfer'
                  : '',
      screen: sub.screen as keyof typeof SCREENS,
    }));

  return (
    <ScrollView className="flex-1 bg-[#F7F8FA]">
      <View className="px-5 pt-6 pb-10">
        {/* Page Title */}
        <Text className="text-2xl font-bold text-[#34343A] mb-4">Funding</Text>

        {/* ================= BALANCE CARD ================= */}
        <View className="rounded-3xl mb-6 bg-white shadow-md">
          <View className="px-6 py-5">
            <Text className="text-[11px] font-semibold text-[#A0A0A8] tracking-widest mb-3">
              AVAILABLE BALANCE
            </Text>

            <View className="flex-row justify-between items-start">
              {/* Prepaid */}
              <View className="w-[45%]">
                <Text className="text-[13px] font-semibold text-[#7A7A82] tracking-wide">
                  PREPAID
                </Text>
                <Text className="text-[28px] font-medium text-gray-700 mt-1">1,889.52</Text>
              </View>

              {/* Divider */}
              <View className="h-full w-[1px] bg-[#E6E6EC]" />

              {/* Postpaid */}
              <View className="w-[45%] pl-4">
                <Text className="text-[13px] font-semibold text-[#7A7A82] tracking-wide">
                  POSTPAID
                </Text>
                <Text className="text-[28px] font-medium text-gray-700 mt-1">14,117.94</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= MENU GRID ================= */}
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
    </ScrollView>
  );
}
