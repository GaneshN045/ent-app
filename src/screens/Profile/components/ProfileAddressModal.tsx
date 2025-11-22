// ProfileAddressModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { Address } from '../../../services/api/profileApi';

type Props = {
  visible: boolean;
  onClose: () => void;
  address?: Address;
};

export default function ProfileAddressModal({ visible, onClose, address }: Props) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      {/* BACKDROP (tap to close) */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/50 justify-end"
      >
        {/* Stop touch propagation into closing */}
        <TouchableWithoutFeedback>
          {/* MODAL CONTENT */}
          <View className="bg-white rounded-t-3xl pt-6 pb-10 px-6 shadow-2xl">
            {/* TOP HANDLE BAR */}
            <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-5" />

            {/* HEADER */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-[22px] font-extrabold text-gray-900 tracking-wide">
                Address Details
              </Text>

              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              >
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* ADDRESS FIELDS */}
            <View className="space-y-6">
              <PremiumField label="Building / Apartment" value={address?.building ?? '-'} />
              <PremiumField label="City" value={address?.city ?? '-'} />
              <PremiumField label="State" value={address?.state ?? '-'} />
              <PremiumField label="Pincode" value={address?.pinCode ?? '-'} />
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.85}
              className="bg-white border border-primary mt-10 py-4 rounded-2xl shadow-md"
            >
              <Text className="text-primary text-center text-[17px] font-bold tracking-wide">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const PremiumField = ({ label, value }: { label: string; value: string }) => (
  <View className="p-4 rounded-2xl border-b border-gray-200">
    <Text className="text-[13px] text-gray-500">{label}</Text>
    <Text className="text-[17px] font-semibold text-gray-900 mt-1">{value}</Text>
  </View>
);
