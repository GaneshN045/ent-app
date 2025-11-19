import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function WalletToWalletScreen() {
  const [walletFrom, setWalletFrom] = useState("");
  const [walletTo, setWalletTo] = useState("");
  const [amount, setAmount] = useState("");
  const [confirmAmount, setConfirmAmount] = useState("");

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      {/* <View className="px-5 py-4 bg-white rounded-b-3xl shadow-md">
        <Text className="text-primary_gray text-2xl font-bold">
          Wallet To Wallet
        </Text>
        <Text className="text-secondary_gray text-sm mt-1">
          Transfer funds between wallets securely
        </Text>
      </View> */}

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="p-5">
          {/* Main Card */}
          <View className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">

            {/* Wallet From */}
            <Text className="text-gray-700 font-semibold mb-1">
              Wallet Type From *
            </Text>
            <TextInput
              value={walletFrom}
              onChangeText={setWalletFrom}
              placeholder="Select Wallet"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Wallet To */}
            <Text className="text-gray-700 font-semibold mb-1">
              Wallet Type To *
            </Text>
            <TextInput
              value={walletTo}
              onChangeText={setWalletTo}
              placeholder="Select Wallet"
              placeholderTextColor="#A0A0A0"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Transfer Amount */}
            <Text className="text-gray-700 font-semibold mb-1">
              Transfer Amount *
            </Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
            />

            {/* Confirm Amount */}
            <Text className="text-gray-700 font-semibold mb-1">
              Confirm Amount *
            </Text>
            <TextInput
              value={confirmAmount}
              onChangeText={setConfirmAmount}
              placeholder="Enter"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              className="bg-gray-100 px-4 py-3 rounded-xl mb-6 text-gray-800"
            />

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-red-500 rounded-xl py-3 px-6 mt-4 shadow-md"
              onPress={() => {}}
            >
              <Text className="text-white font-semibold text-center text-base">
                SUBMIT
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
