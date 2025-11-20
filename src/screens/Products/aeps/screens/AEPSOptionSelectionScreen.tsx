// AEPSOptionSelectionScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import SCREENS from '../../../../constants/screens';
import COLORS from '../../../../constants/colors';

const AEPS_OPTIONS = [
  { label: 'AEPS1', icon: 'fingerprint' },
  { label: 'AEPS2', icon: 'fingerprint' },
  { label: 'AEPS3', icon: 'fingerprint' },
  { label: 'AEPS4', icon: 'fingerprint' },
  { label: 'AEPS5', icon: 'fingerprint' },
  { label: 'AEPS6', icon: 'fingerprint' },
];

export default function AEPSOptionSelectionScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const aepsServiceType = route.params?.option_type;

  const handleSelect = (selectedOption: string) => {
    navigation.navigate(SCREENS.AEPS_SCREEN as any, {
      aeps_service_type: aepsServiceType,
      aeps_option: selectedOption,
    });
  };

  return (
    <View className="flex-1 bg-[#F7F8FA] px-5 pt-6">
      <Text className="text-2xl font-bold text-[#34343A]">Select AEPS Option</Text>

      <Text className="text-gray-500 mt-1 mb-6">AEPS Service: {aepsServiceType}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {AEPS_OPTIONS.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(item.label)}
            activeOpacity={0.85}
            className="flex-row items-center p-5 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            {/* Icon Box */}
            <View className="w-12 h-12 bg-gray-100 rounded-md items-center justify-center mr-4">
              <MaterialIcons name={item.icon} size={26} color={COLORS.GRAY_ICON} />
            </View>

            {/* Label */}
            <Text className="text-lg font-semibold text-gray-800 flex-1">{item.label}</Text>

            {/* Right Arrow */}
            <MaterialIcons name="chevron-right" size={28} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
