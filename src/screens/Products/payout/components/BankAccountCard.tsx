// components/BankAccountCard.tsx
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import COLORS from '../../../../constants/colors';

type Props = {
  account: {
    id: number;
    holderName: string;
    bankName: string;
    accountNo: string;
    ifscCode: string;
    verified: boolean;
  };
  onVerify: (id: number) => void;
  onTransfer: (id: number, type: string, amount: string) => void;
  onDelete: () => void;
  maskAccountNo: (acc: string) => string;
};

export default function BankAccountCard({
  account,
  onVerify,
  onTransfer,
  onDelete,
  maskAccountNo,
}: Props) {
  const [type, setType] = useState<'IMPS' | 'NEFT'>('IMPS');
  const [amount, setAmount] = useState('');

  return (
    <View className="bg-white rounded-3xl shadow-xl p-5 mb-6 border border-gray-100">
      {/* Header Row — Name + Delete */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-extrabold text-gray-900 flex-1">{account.holderName}</Text>

        <TouchableOpacity onPress={onDelete} className="p-2 rounded-full bg-gray-50">
          <MaterialIcons name="delete-outline" size={22} color="#DC2626" />
        </TouchableOpacity>
      </View>

      {/* Bank Name + Verify Row */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm text-gray-500">{account.bankName}</Text>

        {account.verified ? (
          <View className="flex-row items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <MaterialIcons name="verified" size={16} color="#16A34A" />
            <Text className="text-green-700 text-xs font-semibold">Verified</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => onVerify(account.id)}
            activeOpacity={0.85}
            className="flex-row items-center gap-2 px-4 py-2 rounded-xl bg-green-600"
          >
            <MaterialIcons name="verified" size={18} color="#FFFFFF" />
            <Text className="text-white w-20 font-semibold text-sm flex-nowrap ">Verify Now</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Account Details */}
      <View className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-200">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-gray-500 text-xs font-semibold uppercase">Account Number</Text>
            <Text className="text-primary_gray mt-1 font-mono font-bold text-base">
              {maskAccountNo(account.accountNo)}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-gray-500 text-xs font-semibold uppercase">IFSC Code</Text>
            <Text className="text-primary_gray mt-1 font-mono font-bold text-base">
              {account.ifscCode}
            </Text>
          </View>
        </View>
      </View>

      {/* Transfer Section */}
      <View className="flex-row items-center gap-3 mt-2">
        {/* IMPS / NEFT Toggle */}
        <TouchableOpacity
          onPress={() => setType(type === 'IMPS' ? 'NEFT' : 'IMPS')}
          activeOpacity={0.8}
          className="flex-row items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-gray-50"
        >
          <Text className="text-gray-900 font-semibold">{type}</Text>
          <MaterialIcons name="swap-horiz" size={20} color="#64748B" />
        </TouchableOpacity>

        {/* Amount Field */}
        <TextInput
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white"
          placeholder="₹ Amount"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* SEND Button */}
        <TouchableOpacity
          onPress={() => {
            if (amount.trim()) {
              onTransfer(account.id, type, amount);
              setAmount('');
            }
          }}
          className="px-6 py-3 rounded-xl"
          style={{ backgroundColor: COLORS.PRIMARY_COLOR }}
        >
          <Text className="text-white font-bold">SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
