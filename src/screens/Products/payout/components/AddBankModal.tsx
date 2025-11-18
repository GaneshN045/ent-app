// components/AddBankModal.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (acc: { holderName: string; bankName: string; accountNo: string; ifscCode: string }) => void;
};

export default function AddBankModal({ visible, onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    holderName: '',
    bankName: '',
    accountNo: '',
    ifscCode: '',
  });

  const handleSubmit = () => {
    if (Object.values(form).some((v) => !v.trim())) {
      Alert.alert('Please fill all fields');
      return;
    }
    onAdd(form);
    setForm({ holderName: '', bankName: '', accountNo: '', ifscCode: '' });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <View className="bg-white rounded-2xl p-6 w-full max-w-md">
          <Text className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add Bank Account
          </Text>

          <TextInput
            className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 placeholder:text-gray-500"
            placeholder="Account Holder Name"
            value={form.holderName}
            onChangeText={(t) => setForm({ ...form, holderName: t })}
          />
          <TextInput
            className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 placeholder:text-gray-500"
            placeholder="Bank Name"
            value={form.bankName}
            onChangeText={(t) => setForm({ ...form, bankName: t })}
          />
          <TextInput
            className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-4 placeholder:text-gray-500"
            placeholder="Account Number"
            keyboardType="numeric"
            value={form.accountNo}
            onChangeText={(t) => setForm({ ...form, accountNo: t })}
          />
          <TextInput
            className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg mb-6 placeholder:text-gray-500"
            placeholder="IFSC Code"
            value={form.ifscCode}
            onChangeText={(t) => setForm({ ...form, ifscCode: t.toUpperCase() })}
          />

          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-200 py-3 rounded-lg"
            >
              <Text className="text-center font-bold text-gray-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 bg-primary py-3 rounded-lg"
            >
              <Text className="text-center text-white font-bold">Add Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}