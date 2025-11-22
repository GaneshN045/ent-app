import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/headers/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../constants/colors';
import { storage } from '../../utils/storage';
import { useAppSelector } from '../../store/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardHomeScreen() {
  const navigation = useNavigation<any>();
  const [token, setToken] = useState<string | null>(null);
  const user = useAppSelector(state=> state.auth.user)

  const [userId, setUserId] = useState<any>('')

    useEffect(() => {
    let mounted = true;
    (async () => {
      const id = await AsyncStorage.getItem('USER_ID')
      if (mounted) {
       setUserId(id)
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const storedToken = await storage.loadToken();
      if (mounted) {
        setToken(storedToken);
        console.log('get_token : ', storedToken);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <CustomHeader />,
    });
  }, [navigation]);

  return (
    <ScrollView className="bg-gray-50 flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Page Title */}
      <View className=' flex flex-row items-center gap-2 px-5 mt-5'>
        <Text className='text-xl font-bold text-primary_gray'>Dashboard</Text>
        <Text className=' text-secondary_gray'>({userId})</Text>
        </View>

      {/* ===== TOP SUMMARY CARD (Premium Big Card) ===== */}
      <View
        className="
          bg-white rounded-3xl px-5 py-6 mx-5 mt-5 mb-5
          border border-[#ECECF1] shadow-md shadow-gray-400/20
        "
        style={{ elevation: 3 }}
      >
        <Text className="text-base font-semibold text-primary_gray">Total Overview</Text>

        <View className="flex-row justify-between mt-4">
          <View>
            <Text className="text-secondary_gray text-sm">Today’s Revenue</Text>
            <Text className="text-2xl font-bold text-primary_gray mt-1">₹ 8,540</Text>
          </View>

          <View className="items-end">
            <Text className="text-green-600 font-semibold">↑ 12.4%</Text>
            <Text className="text-xs text-secondary_gray mt-1">vs yesterday</Text>
          </View>
        </View>

        {/* Mini Chart Placeholder */}
        <View
          className="
            mt-5 h-20 rounded-2xl bg-gray-100
            flex-row items-center justify-center
          "
        >
          <Text className="text-secondary_gray text-xs">[small line graph]</Text>
        </View>
      </View>

      {/* ===== INDIVIDUAL METRIC CARDS ===== */}
      <View className="px-5">
        {/* CARD - Funds Received */}
        <View
          className="
            bg-white p-6 rounded-3xl mb-4
            border border-[#ECECF1]
            shadow-sm shadow-gray-300/40
            flex-row items-center justify-between
          "
          style={{ elevation: 2 }}
        >
          <View>
            <Text className="text-secondary_gray text-sm">Funds Received</Text>
            <Text className="text-2xl font-bold text-primary_gray mt-1">₹ 1,24,500</Text>
            <Text className="text-green-600 text-xs mt-1">↑ 5.6% this week</Text>
          </View>
          <Icon name="account-balance-wallet" size={36} color={COLORS.GRAY_ICON} />
        </View>

        {/* CARD - Transaction Volume */}
        <View
          className="
            bg-white p-6 rounded-3xl mb-4
            border border-[#ECECF1]
            shadow-sm shadow-gray-300/40
            flex-row items-center justify-between
          "
          style={{ elevation: 2 }}
        >
          <View>
            <Text className="text-secondary_gray text-sm">Transaction Volume</Text>
            <Text className="text-2xl font-bold text-primary_gray mt-1">865</Text>
            <Text className="text-blue-600 text-xs mt-1">Active users ↑ 9%</Text>
          </View>
          <Icon name="swap-horiz" size={36} color={COLORS.GRAY_ICON} />
        </View>

        {/* CARD - Commission Earned */}
        <View
          className="
            bg-white p-6 rounded-3xl mb-4
            border border-[#ECECF1]
            shadow-sm shadow-gray-300/40
            flex-row items-center justify-between
          "
          style={{ elevation: 2 }}
        >
          <View>
            <Text className="text-secondary_gray text-sm">Commission Earned</Text>
            <Text className="text-2xl font-bold text-primary_gray mt-1">₹ 6,480</Text>
            <Text className="text-purple-600 text-xs mt-1">+ ₹820 this week</Text>
          </View>
          <Icon name="payments" size={36} color={COLORS.GRAY_ICON} />
        </View>

        {/* CARD - Pending Transactions */}
        <View
          className="
            bg-white p-6 rounded-3xl mb-6
            border border-[#ECECF1]
            shadow-sm shadow-gray-300/40
            flex-row items-center justify-between
          "
          style={{ elevation: 2 }}
        >
          <View>
            <Text className="text-secondary_gray text-sm">Pending Transactions</Text>
            <Text className="text-2xl font-bold text-primary_gray mt-1">12</Text>
            <Text className="text-orange-600 text-xs mt-1">3 require review</Text>
          </View>
          <Icon name="pending-actions" size={36} color={COLORS.GRAY_ICON} />
        </View>
      </View>

      <View style={{ height: 80 }}></View>
    </ScrollView>
  );
}
