// ProfileBanksModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { Bank } from '../../../services/api/profileApi';

type Props = {
  visible: boolean;
  onClose: () => void;
  banks?: Bank[];
};

export default function ProfileBanksModal({ visible, onClose, banks }: Props) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <View className="flex-1 bg-black/50 justify-end">
        {/* CLICK OUTSIDE TO CLOSE */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1" />
        </TouchableWithoutFeedback>

        {/* MODAL BOX */}
        <View className="bg-white rounded-t-3xl pt-6 pb-10 px-6 max-h-[80%] shadow-2xl">
          {/* HANDLE BAR */}
          <View className="w-14 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-[22px] font-extrabold text-gray-900 tracking-wide">
              Bank Accounts
            </Text>

            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* SCROLLABLE LIST */}
          <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
            {(banks ?? []).map((bank: Bank) => (
              <BankCard key={bank.id} bank={bank} />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

/* BANK CARD COMPONENT */
const BankCard = ({ bank }: { bank: Bank }) => {
  return (
    <View className="p-5 mb-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Bank Name */}
      <Text className="text-lg font-bold text-primary_gray">{bank.bankName}</Text>

      {/* Holder */}
      <Text className="text-sm text-gray-500 mt-1">Account Holder</Text>
      <Text className="text-base font-semibold text-gray-800">{bank.accountName}</Text>

      {/* Account Number */}
      <Text className="text-sm text-gray-500 mt-3">Account Number</Text>
      <Text className="text-base font-semibold text-primary_gray tracking-wide">
        {'*'.repeat(bank.accountNo.length - 4)}
        {bank.accountNo.slice(-4)}
      </Text>

      {/* IFSC */}
      <Text className="text-sm text-gray-500 mt-3">IFSC Code</Text>
      <Text className="text-base font-semibold text-primary_gray">{bank.ifcscode}</Text>

      {/* STATUS + DELETE */}
      <View className="flex-row justify-between items-center mt-5">
        {/* Verified Tag */}
        <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
          <MaterialIcons name="verified" size={16} color="#16a34a" />
          <Text className="ml-1 text-green-700 font-semibold text-sm">Verified</Text>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          className="flex-row items-center px-4 py-2 bg-red-50 border border-red-300 rounded-xl"
        >
          <MaterialIcons name="delete" size={20} color="#dc2626" />
          <Text className="ml-2 text-red-600 font-semibold text-sm">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
