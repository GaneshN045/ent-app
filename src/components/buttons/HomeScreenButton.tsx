import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import '../../../global.css';
import COLORS from '../../constants/colors';

interface HomeScreenButtonProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
}

export default function HomeScreenButton({
  title,
  subtitle,
  icon,
  onPress,
}: HomeScreenButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="
        w-[48%] mb-4
        bg-white
        rounded-3xl
        px-4 py-6
        border border-[#ECECF1]
        active:opacity-80
        items-center
      "
      style={{
        elevation: 6,
        shadowColor: 'gray',
        shadowOpacity: 0.12,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Icon name={icon} size={28} color={COLORS.GRAY_ICON} />

      <Text className="text-lg font-semibold text-primary_gray mt-3 text-center">{title}</Text>

      {subtitle && (
        <Text className="text-sm text-secondary_gray mt-1 text-center leading-4">{subtitle}</Text>
      )}
    </TouchableOpacity>
  );
}
