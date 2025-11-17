// screens/Settings/SettingsHomeScreen.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SCREENS from "../../constants/screens";
import "../../../global.css";

type SettingsNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function SettingsHomeScreen() {
  const navigation = useNavigation<SettingsNavigationProp>();

  const menuItems = [
    { title: "Create Sub User", icon: "person-add", screen: SCREENS.CREATE_SUB_USER_SCREEN },
    { title: "Change TPIN", icon: "lock", screen: SCREENS.CHANGE_TPIN_SCREEN },
    { title: "My Certificate", icon: "verified", screen: SCREENS.MY_CERTIFICATE_SCREEN },
    { title: "Low Balance Alert", icon: "notifications-active", screen: SCREENS.LOW_BALANCE_ALERT_SCREEN },
    { title: "ID Card", icon: "badge", screen: SCREENS.ID_CARD_SCREEN },
  ];

  return (
    <View className="flex-1 bg-[#F7F8FA] px-5 pt-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-[#34343A] mb-5">
        Settings
      </Text>

      {/* Grid Layout */}
      <View className="flex-row flex-wrap justify-between">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            className="
              w-[48%] mb-4
              bg-white
              rounded-3xl
              px-4 py-5
              border border-[#ECECF1]
              shadow-sm shadow-gray-300/30
              active:opacity-80
              items-center
            "
            style={{ elevation: 2 }}
          >
            {/* Lighter Icon */}
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
  );
}
