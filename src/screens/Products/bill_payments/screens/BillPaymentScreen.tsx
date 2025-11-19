import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../../../constants/colors";
import SCREENS from "../../../../constants/screens";

const CATEGORIES = [
    // 9 ITEMS
    {
      title: "Recommended For You",
      items: [
        { label: "Mobile Prepaid", icon: "phone-iphone" },
        { label: "Mobile Postpaid", icon: "phone-android" },
        { label: "Electricity", icon: "bolt" },
  
        { label: "DTH", icon: "tv" },
        { label: "Broadband", icon: "wifi" },
        { label: "FASTag", icon: "local-offer" },
  
        { label: "Gas", icon: "local-gas-station" },
        { label: "LPG Gas", icon: "local-fire-department" },
        { label: "Water", icon: "water" },
      ],
    },
  
    // 6 ITEMS
    {
      title: "Finance & Banking",
      items: [
        { label: "Loan", icon: "account-balance" },
        { label: "Credit Card", icon: "credit-card" },
        { label: "Insurance", icon: "shield" },
  
        { label: "Recurring", icon: "savings" },
        { label: "NCMC", icon: "credit-card" },
        { label: "Taxes", icon: "account-balance-wallet" },
      ],
    },
  
    // 6 ITEMS
    {
      title: "TV & Entertainment",
      items: [
        { label: "DTH", icon: "tv" }, // Repeated? You can remove if needed
        { label: "Cable TV", icon: "cable" },
        { label: "Subscription", icon: "subscriptions" },
  
        { label: "Broadband", icon: "wifi" }, // optional filler for 6 count
        { label: "Internet", icon: "language" }, // optional icon
        { label: "OTT", icon: "live-tv" }, // optional
      ],
    },
  
    // 3 ITEMS
    {
      title: "Government & Municipal",
      items: [
        { label: "Municipal", icon: "location-city" },
        { label: "Taxes", icon: "account-balance-wallet" }, // optional duplicate
        { label: "Water", icon: "water" },
      ],
    },
  
    // 3 ITEMS
    {
      title: "Housing & Societies",
      items: [
        { label: "Housing", icon: "home-work" },
        { label: "Associations", icon: "groups" },
        { label: "Rental", icon: "apartment" },
      ],
    },
  
    // 3 ITEMS
    {
      title: "Health & Education",
      items: [
        { label: "Hospital", icon: "local-hospital" },
        { label: "Pathology", icon: "healing" },
        { label: "Education", icon: "school" },
      ],
    },
  
    // 3 ITEMS
    {
      title: "Donations",
      items: [
        { label: "Donation", icon: "volunteer-activism" },
        { label: "Temple", icon: "temple-buddhist" },
        { label: "Trust", icon: "handshake" },
      ],
    },
  ];
  

export default function BillPaymentScreen() {
  const navigation = useNavigation<any>();

  const onSelect = (item: any) => {
    navigation.navigate(SCREENS.PAY_SCREEN, { category: item.label });
  };

  return (
    <View className="flex-1 bg-gray-50">

      <ScrollView showsVerticalScrollIndicator={false}>
        {CATEGORIES.map((section, sIndex) => (
          <View key={sIndex} className="mt-6 px-4">
            {/* Category Title */}
            <Text className="text-lg font-bold text-gray-800 mb-3">
              {section.title}
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelect(item)}
                  className="
                    w-[31%] mb-4
                    bg-white
                    rounded-3xl
                    px-3 py-5
                    border border-[#ECECF1]
                    shadow-sm shadow-gray-300/30
                    items-center
                  "
                  style={{ elevation: 2 }}
                  activeOpacity={0.85}
                >
                  <Icon
                    name={item.icon}
                    size={26}
                    color={COLORS.GRAY_ICON}
                  />

                  <Text className="text-[13px] font-semibold text-primary_gray mt-2 text-center leading-4">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View className="mb-10" />
      </ScrollView>
    </View>
  );
}
