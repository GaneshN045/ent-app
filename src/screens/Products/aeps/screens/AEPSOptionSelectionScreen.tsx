// AEPSOptionSelectionScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import SCREENS from '../../../../constants/screens';
import COLORS from '../../../../constants/colors';

const AEPS_SERVICES = [
  {
    label: 'Cash Withdrawal',
    service_type: 'AEPS_CASH_WITHDRAWAL',
    icon: 'money',
    description: 'Cash withdrawal from any supported bank account using Aadhaar authentication.',
  },
  {
    label: 'Balance Enquiry',
    service_type: 'AEPS_BALANCE_ENQUIRY',
    icon: 'account-balance-wallet',
    description: 'Quickly check linked bank account balance with a secure biometric verification.',
  },
  {
    label: 'Mini Statement',
    service_type: 'AEPS_MINI_STATEMENT',
    icon: 'list-alt',
    description: 'View the latest transactions for the customer’s AEPS-enabled bank account.',
  },
];

export default function AEPSServiceOptionSelection() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const selectedVendor = route.params?.option_type; // e.g. AEPS1..6

  const handleSelect = (service: { label: string; service_type: string }) => {
    navigation.navigate(SCREENS.AEPS_SCREEN as any, {
      aeps_vendor: selectedVendor,
      aeps_service_type: service.service_type,
      aeps_service_label: service.label,
    });
  };

  return (
    <View className="flex-1 bg-[#F7F8FA] px-3 pt-8">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {AEPS_SERVICES.map(
          (
            item: { label: string; service_type: string; icon: string; description: string },
            index: number,
          ) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(item)}
              activeOpacity={0.9}
              className="flex-row items-center px-7 py-8 mb-7 bg-white rounded
             border border-[#E9ECF1] min-h-[170px] mx-2"
              style={{
                elevation: 6,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                borderRadius: 12,
              }}
            >
              {/* Icon Box */}
              <View className="w-20 h-20 bg-gray-100 border border-gray-200 rounded-3xl items-center justify-center mr-6">
                <MaterialIcons name={item.icon} size={32} color={COLORS.GRAY_ICON} />
              </View>

              {/* Content */}
              <View className="flex-1 pr-2">
                <Text className="text-xl font-semibold text-gray-900 mb-2">{item.label}</Text>

                <Text className="text-sm text-gray-500 leading-5" numberOfLines={3}>
                  {item.description}
                </Text>
              </View>

              {/* Right Arrow */}
              <MaterialIcons name="chevron-right" size={34} color="#BFC7D5" />
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </View>
  );
}
