import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PGScreenForm() {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={60}   // pushes input above keyboard
      contentContainerStyle={{ padding: 5, paddingBottom: 100 }}
    >
      <View
        className="
          bg-white rounded-3xl p-5 mt-4
          border border-gray-200 shadow-sm shadow-black/10
        "
      >
        {/* Payment Method */}
        <Text className="text-gray-600 mb-2">
          Payment Method <Text className="text-red-500">*</Text>
        </Text>
        <View className="p-4 bg-gray-100 rounded-2xl border border-gray-200">
          <Text className="text-gray-800">Auto Selected</Text>
        </View>

        {/* Card Holder Name */}
        <Text className="text-gray-600 mt-4 mb-2">
          Card Holder Name <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          placeholder="Enter card holder name"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 p-4 rounded-2xl border border-gray-200"
        />

        {/* Card Holder Mobile */}
        <Text className="text-gray-600 mt-4 mb-2">
          Card Holder Mobile <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={10}
          placeholder="Enter 10-digit mobile number"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 p-4 rounded-2xl border border-gray-200"
        />

        {/* Product */}
        <Text className="text-gray-600 mt-4 mb-2">
          Product <Text className="text-red-500">*</Text>
        </Text>
        <View className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <Text className="text-gray-500">Select Product</Text>
        </View>

        {/* Sub Product */}
        <Text className="text-gray-600 mt-4 mb-2">
          Sub Product <Text className="text-red-500">*</Text>
        </Text>
        <View className="p-4 bg-gray-100 rounded-2xl border border-gray-200">
          <Text className="text-gray-400">Select Product First</Text>
        </View>

        {/* Amount */}
        <Text className="text-gray-600 mt-4 mb-2">
          Amount <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Enter amount"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 p-4 rounded-2xl border border-gray-200"
        />

        {/* Confirm Amount */}
        <Text className="text-gray-600 mt-4 mb-2">
          Confirm Amount <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="Re-enter amount"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 p-4 rounded-2xl border border-gray-200"
        />

        {/* Narration */}
        <Text className="text-gray-600 mt-4 mb-2">
          Narration <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          placeholder="Enter narration"
          placeholderTextColor="#9CA3AF"
          className="bg-gray-50 p-4 rounded-2xl border border-gray-200"
        />

        {/* OPEN DEVICE BUTTON */}
        <TouchableOpacity className="mt-6 bg-white border border-primary p-4 rounded-2xl">
          <Text className="text-center text-primary font-semibold">
            Open Device
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
