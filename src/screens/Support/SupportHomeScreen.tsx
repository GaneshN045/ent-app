import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeScreenButton from "../../components/buttons/HomeScreenButton";
import SCREENS from "../../constants/screens";
import "../../../global.css";

type SupportNavProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function SupportHomeScreen() {
  const navigation = useNavigation<SupportNavProp>();

  const menuItems = [
    {
      title: "Bio Metric Device",
      icon: "fingerprint",
      subtitle: "Manage device",
      screen: SCREENS.BIOMETRIC_DEVICE_SCREEN,
    },
    {
      title: "Ticketing System",
      icon: "support-agent",
      subtitle: "Raise a ticket",
      screen: SCREENS.TICKETING_SCREEN,
    },
    {
      title: "Contact Us",
      icon: "contact-mail",
      subtitle: "Get support",
      screen: SCREENS.CONTACT_US_SCREEN,
    },
    {
      title: "Top Up Request",
      icon: "add-circle",
      subtitle: "Add credits",
      screen: SCREENS.TOP_UP_REQUEST_SCREEN,
    },
    {
      title: "Top Up History",
      icon: "history",
      subtitle: "View history",
      screen: SCREENS.TOP_UP_HISTORY_SCREEN,
    },
    {
      title: "Add Money",
      icon: "currency-rupee",
      subtitle: "funds",
      screen: SCREENS.ADD_MONEY_SCREEN,
    },
    {
      title: "Payment Request",
      icon: "payment",
      subtitle: "Make request",
      screen: SCREENS.PAYMENT_REQUEST_SCREEN,
    },
    {
      title: "Payment History",
      icon: "history",
      subtitle: "View history",
      screen: SCREENS.PAYMENT_HISTORY_SCREEN,
    },
    {
      title: "Payment Banks",
      icon: "account-balance",
      subtitle: "Bank details",
      screen: SCREENS.PAYMENT_BANKS_SCREEN,
    },
  ];

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
