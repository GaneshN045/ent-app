// screens/Funding/FundingHomeScreen.tsx

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../../constants/screens';
import '../../../global.css';
import HomeScreenButton from '../../components/buttons/HomeScreenButton';
import { useAppSelector } from '../../store/hooks';
import { Role, canAccess, allMenuItems } from '../../navigation/menuConfig';
import { useUserId } from '../../hooks/useUserId';
import { useGetWalletBalanceQuery } from '../../services/api/profileApi';

type FundingNavigationProp = { 
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function FundingHomeScreen() {
  const navigation = useNavigation<FundingNavigationProp>();
  const userRole = (useAppSelector(state => state.auth.user?.role) || 'RT') as Role;
  const { userId: persistedUserId } = useUserId();
  const memberId = persistedUserId;
  const { data: walletResponse, isFetching: walletFetching, refetch } =
    useGetWalletBalanceQuery(memberId ?? '', {
      skip: !Boolean(memberId),
    });
  const walletData = walletResponse?.data;
  const [refreshing, setRefreshing] = useState(false);

  const formatCurrency = (value?: number) =>
    value == null
      ? '—'
      : `₹${value.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  const onRefresh = useCallback(async () => {
    if (!refetch) return;
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

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

  const prepaidLabel = formatCurrency(walletData?.prepaidBalance);
  const postpaidLabel = formatCurrency(walletData?.postpaidBalance);

  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.25, 0.65, 0.25],
  });

  return (
    <ScrollView
      className="flex-1 bg-[#F7F8FA]"
      refreshControl={<RefreshControl refreshing={refreshing || walletFetching} onRefresh={onRefresh} />}
    >
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
                {walletFetching && (
                  <Animated.View
                    className="mt-4 h-8 w-28 rounded-lg bg-gray-200"
                    style={{ opacity: shimmerOpacity }}
                  />
                )}
                {!walletFetching && (
                  <Text className="text-[28px] font-medium text-gray-700 mt-1">{prepaidLabel}</Text>
                )}
              </View>

              {/* Divider */}
              <View className="h-full w-[1px] bg-[#E6E6EC]" />

              {/* Postpaid */}
              <View className="w-[45%] pl-4">
                <Text className="text-[13px] font-semibold text-[#7A7A82] tracking-wide">
                  POSTPAID
                </Text>
                {walletFetching && (
                  <Animated.View
                    className="mt-4 h-8 w-28 rounded-lg bg-gray-200"
                    style={{ opacity: shimmerOpacity }}
                  />
                )}
                {!walletFetching && (
                  <Text className="text-[28px] font-medium text-gray-700 mt-1">{postpaidLabel}</Text>
                )}
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
