import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FundRequestScreen() {
  const [depositType, setDepositType] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [holderName, setHolderName] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmAmount, setConfirmAmount] = useState('');
  const [date, setDate] = useState('');
  const [slip, setSlip] = useState<any>(null);
  const [narration, setNarration] = useState('');

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      {/* <View className="px-5 py-4 bg-white rounded-b-3xl shadow-md">
        <Text className="text-primary_gray text-2xl font-bold">
          Fund Request
        </Text>
        <Text className="text-secondary_gray text-sm mt-1">
          Fill details to raise fund request
        </Text>
      </View> */}

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="p-5">
          {/* Card */}
          <View className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
            {/* Deposit Type */}
            <Text className="text-gray-700 font-semibold mb-1">Deposit Type *</Text>
            <TextInput
              value={depositType}
              onChangeText={setDepositType}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Transaction ID */}
            <Text className="text-gray-700 font-semibold mb-1">Transaction ID *</Text>
            <TextInput
              value={transactionId}
              onChangeText={setTransactionId}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Bank Name */}
            <Text className="text-gray-700 font-semibold mb-1">Bank Name *</Text>
            <TextInput
              value={bankName}
              onChangeText={setBankName}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Account Number */}
            <Text className="text-gray-700 font-semibold mb-1">Bank Account Number *</Text>
            <TextInput
              value={accountNo}
              onChangeText={setAccountNo}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              keyboardType="number-pad"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Holder Name */}
            <Text className="text-gray-700 font-semibold mb-1">Bank Account Holder Name *</Text>
            <TextInput
              value={holderName}
              onChangeText={setHolderName}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Payment Mode */}
            <Text className="text-gray-700 font-semibold mb-1">Payment Mode *</Text>
            <TextInput
              value={paymentMode}
              onChangeText={setPaymentMode}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Amount */}
            <Text className="text-gray-700 font-semibold mb-1">Amount *</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Confirm Amount */}
            <Text className="text-gray-700 font-semibold mb-1">Confirm Amount *</Text>
            <TextInput
              value={confirmAmount}
              onChangeText={setConfirmAmount}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Select Date */}
            <Text className="text-gray-700 font-semibold mb-1">Select a Date *</Text>
            <TouchableOpacity
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 flex-row items-center justify-between"
              activeOpacity={0.8}
            >
              <Text className="text-gray-600">{date || 'Choose Date'}</Text>
              <Icon name="date-range" size={24} color="#555" />
            </TouchableOpacity>

            {/* Deposit Slip Upload */}
            <Text className="text-gray-700 font-semibold mb-2">Deposit Slip *</Text>

            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-gray-100 px-4 py-4 rounded-xl border border-gray-200 flex-row justify-between items-center mb-1"
            >
              <Text className="text-gray-600">{slip ? slip.name : 'No File Chosen'}</Text>
              <Icon name="upload-file" size={24} color="#555" />
            </TouchableOpacity>

            <Text className="text-gray-400 text-xs mb-4">
              PNG, JPEG, JPG, PDF files (max 1.5MB)
            </Text>

            {/* Narration */}
            <Text className="text-gray-700 font-semibold mb-1">Narration *</Text>
            <TextInput
              value={narration}
              onChangeText={setNarration}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              className="bg-gray-100 px-4 py-3 rounded-xl mb-6 text-gray-800"
            />

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-red-500 rounded-xl py-3 px-6 mt-4 shadow-md"
            >
              <Text className="text-white font-semibold text-center text-base">SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
