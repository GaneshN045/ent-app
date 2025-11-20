import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../constants/colors'; // your theme colors

export default function FundTransferScreen() {
  const [toAccount, setToAccount] = useState('');
  const [walletFrom, setWalletFrom] = useState('');
  const [walletTo, setWalletTo] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmAmount, setConfirmAmount] = useState('');
  const [narration, setNarration] = useState('');

  return (
    <ScrollView
      className="flex-1 bg-[#F7F7F9]"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Card */}
      <View className="bg-white rounded-3xl px-5 py-6 shadow-sm border border-[#ECECF1]">
        {/* To Account */}
        <Text className="text-sm text-primary_gray mb-1">To Account *</Text>
        <TextInput
          placeholder="Enter Account ID"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={toAccount}
          onChangeText={setToAccount}
        />

        {/* From Wallet Type */}
        <Text className="text-sm text-primary_gray mb-1">From Wallet Type *</Text>
        <TextInput
          placeholder="Select Wallet Type"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={walletFrom}
          onChangeText={setWalletFrom}
        />

        {/* To Wallet Type */}
        <Text className="text-sm text-primary_gray mb-1">To Wallet Type *</Text>
        <TextInput
          placeholder="Select Wallet Type"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={walletTo}
          onChangeText={setWalletTo}
        />

        {/* Amount */}
        <Text className="text-sm text-primary_gray mb-1">Amount *</Text>
        <TextInput
          placeholder="Enter Amount"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Confirm Amount */}
        <Text className="text-sm text-primary_gray mb-1">Confirm Amount *</Text>
        <TextInput
          placeholder="Confirm Amount"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={confirmAmount}
          onChangeText={setConfirmAmount}
        />

        {/* Narration */}
        <Text className="text-sm text-primary_gray mb-1">Narration *</Text>
        <TextInput
          placeholder="Enter Narration"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={3}
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-6 border border-gray-200 text-primary_gray"
          value={narration}
          onChangeText={setNarration}
        />

        {/* Submit Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="rounded-2xl py-4 flex-row items-center justify-center shadow-md"
          style={{ backgroundColor: COLORS.PRIMARY_COLOR }}
        >
          <Icon name="send" size={20} color="#FFF" />
          <Text className="text-white font-semibold text-base ml-2">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
