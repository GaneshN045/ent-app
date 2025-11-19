// screens/Settings/SettingsHomeScreen.tsx

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SCREENS from "../../constants/screens";
import "../../../global.css";
import HomeScreenButton from "../../components/buttons/HomeScreenButton";

type SettingsNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function SettingsHomeScreen() {
  const navigation = useNavigation<SettingsNavigationProp>();

  const menuItems = [
    // {
    //   title: "Create Sub User",
    //   icon: "person-add",
    //   subtitle: "Manage user",
    //   screen: SCREENS.CREATE_SUB_USER_SCREEN,
    // },
    {
      title: "Change TPIN",
      icon: "lock",
      subtitle: "Manage TPIN",
      screen: SCREENS.CHANGE_TPIN_SCREEN,
    },
    {
      title: "My Certificate",
      icon: "verified",
      subtitle: "View certificate",
      screen: SCREENS.MY_CERTIFICATE_SCREEN,
    },
    {
      title: "Low Balance Alert",
      icon: "notifications-active",
      subtitle: "Configure alerts",
      screen: SCREENS.LOW_BALANCE_ALERT_SCREEN,
    },
    {
      title: "ID Card",
      icon: "badge",
      subtitle: "View ID",
      screen: SCREENS.ID_CARD_SCREEN,
    },
  ];

  return (
    <View className="flex-1 bg-[#F7F8FA] px-5 pt-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-[#34343A] mb-5">
        Settings
      </Text>

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
