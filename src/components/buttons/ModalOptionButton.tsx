// components/buttons/ModalOptionButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../constants/colors';

export default function ModalOptionButton({ title, icon, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full bg-white p-4 rounded-xl mb-3 flex-row items-center shadow-sm border border-gray-200"
    >
      <View className="w-10 h-10 bg-gray-100 rounded-xl justify-center items-center mr-3">
        <Icon name={icon} size={22} color={COLORS.GRAY_ICON} />
      </View>

      <Text className="text-lg font-semibold text-primary_gray">{title}</Text>
    </TouchableOpacity>
  );
}
