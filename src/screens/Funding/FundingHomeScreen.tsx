// screens/Funding/FundingHomeScreen.tsx

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SCREENS from "../../constants/screens";
import "../../../global.css";

type FundingNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function FundingHomeScreen() {
  const navigation = useNavigation<FundingNavigationProp>();

  const menuItems = [
    { title: "Fund Request", icon: "request-quote", screen: SCREENS.FUND_REQUEST_SCREEN },
    { title: "Wallet To Wallet", icon: "swap-horiz", screen: SCREENS.WALLET_TO_WALLET_SCREEN },
    { title: "Fund Transfer", icon: "send", screen: SCREENS.FUND_TRANSFER_SCREEN },
    { title: "Fund Reversal", icon: "history", screen: SCREENS.FUND_REVERSAL_SCREEN },
    { title: "Move To Bank", icon: "account-balance", screen: SCREENS.WALLET_TO_BANK_SCREEN },
  ];

  return (
    <ScrollView className="flex-1 bg-[#F7F8FA]">
      <View className="px-5 pt-6 pb-10">

        {/* Page Title */}
        <Text className="text-2xl font-bold text-[#34343A] mb-4">
          Funding
        </Text>

        {/* ====================== BALANCE CARD PREMIUM ====================== */}
        <View
          className=" rounded-3xl mb-6 bg-white shadow-md "
        >
          {/* INNER CONTENT */}
          <View className="px-6 py-5">

            {/* TITLE */}
            <Text className="text-[11px] font-semibold text-[#A0A0A8] tracking-widest mb-3">
              AVAILABLE BALANCE
            </Text>

            {/* AMOUNT ROW */}
            <View className="flex-row justify-between items-start">

              {/* PREPAID */}
              <View className="w-[45%]">
                <Text className="text-[13px] font-semibold text-[#7A7A82] tracking-wide">
                  PREPAID
                </Text>
                <Text className="text-[28px] font-medium text-gray-700 mt-1">
                  1,889.52
                </Text>
              </View>

              {/* DIVIDER */}
              <View className="h-full w-[1px] bg-[#E6E6EC]" />

              {/* POSTPAID */}
              <View className="w-[45%] pl-4">
                <Text className="text-[13px] font-semibold text-[#7A7A82] tracking-wide">
                  POSTPAID
                </Text>
                <Text className="text-[28px] font-medium text-gray-700 mt-1">
                  14,117.94
                </Text>
              </View>

            </View>

          </View>
        </View>


        {/* ====================== MENU GRID ====================== */}
        <View className="flex-row flex-wrap justify-between">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}
              className="
                w-[48%] mb-4
                bg-white rounded-3xl
                px-4 py-5
                border border-[#ECECF1]
                shadow-sm shadow-gray-300/30
                items-center active:opacity-80
              "
              style={{ elevation: 2 }}
            >
              {/* ICON */}
              <Icon name={item.icon} size={30} color="#6E6E76" />

              {/* Title */}
              <Text className="text-lg font-semibold text-[#3A3A42] mt-3 text-center">
                {item.title}
              </Text>

              {/* Subtext */}
              <Text className="text-sm text-[#9A9AA3] mt-1 text-center leading-4">
                Manage {item.title.split(" ")[0].toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}
