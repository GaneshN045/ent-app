import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors"; // your color file

export default function WalletToBankScreen() {
  const [walletType, setWalletType] = useState("");
  const [bank, setBank] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [confirmAmount, setConfirmAmount] = useState("");

  return (
    <ScrollView
      className="flex-1 bg-[#F7F7F9]"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-semibold text-primary_gray mb-5">
        Wallet to Bank (POSTPAID)
      </Text>

      {/* Main Card */}
      <View className="bg-white rounded-3xl px-5 py-6 shadow-sm border border-[#ECECF1]">

        {/* Wallet Type */}
        <Text className="text-sm text-primary_gray mb-1">Wallet Type *</Text>
        <TextInput
          placeholder="Select Wallet Type"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={walletType}
          onChangeText={setWalletType}
        />

        {/* Select Bank */}
        <Text className="text-sm text-primary_gray mb-1">Select Bank *</Text>
        <TextInput
          placeholder="Select Bank"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={bank}
          onChangeText={setBank}
        />

        {/* Payment Mode */}
        <Text className="text-sm text-primary_gray mb-1">Payment Mode *</Text>
        <TextInput
          placeholder="Select Payment Mode"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-4 border border-gray-200 text-primary_gray"
          value={paymentMode}
          onChangeText={setPaymentMode}
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
          className="bg-gray-50 rounded-2xl px-4 py-3 mb-6 border border-gray-200 text-primary_gray"
          value={confirmAmount}
          onChangeText={setConfirmAmount}
        />

        {/* Submit */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-primary rounded-2xl py-4 flex-row items-center justify-center shadow-md"
          style={{ backgroundColor: COLORS.PRIMARY_COLOR }}
        >
          <Icon name="send" size={20} color="#FFF" />
          <Text className="text-white font-semibold text-base ml-2">
            Submit
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
