import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React, { useState } from 'react';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  
  export default function AddRemitterScreen() {
    const [aadhaar, setAadhaar] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
  
    return (
      <View className="flex-1 bg-white">
        
        {/* Header */}
        <View className="px-5 py-4 bg-white rounded-b-3xl shadow-md">
          <Text className="text-primary_gray text-2xl font-bold">Register Remitter</Text>
          <Text className="text-secondary_gray text-sm mt-1">
            Complete eKYC to proceed with money transfer
          </Text>
        </View>
  
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View className="p-5">
  
            {/* Card */}
            <View className="bg-white shadow-md rounded-2xl p-5 border border-gray-100">
  
              {/* Aadhaar Field */}
              <Text className="text-gray-700 font-semibold mb-1">Aadhaar Number</Text>
              <TextInput
                value={aadhaar}
                onChangeText={setAadhaar}
                placeholder="Enter Aadhaar Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="number-pad"
                maxLength={12}
                className="w-full bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
              />
  
              {/* Name Field */}
              <Text className="text-gray-700 font-semibold mb-1">Full Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter Name"
                placeholderTextColor="#A0A0A0"
                className="w-full bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
              />
  
              {/* Mobile Field */}
              <Text className="text-gray-700 font-semibold mb-1">Mobile Number</Text>
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="number-pad"
                maxLength={10}
                className="w-full bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800"
              />
  
              {/* Standard OTP UI */}
              <View className="flex-row justify-between items-center mt-2 mb-3">
                <Text className="text-gray-700 font-semibold">OTP</Text>
  
                <TouchableOpacity activeOpacity={0.85} onPress={() => {}}>
                  <Text className="text-primary font-semibold text-base">Send OTP</Text>
                </TouchableOpacity>
              </View>
  
              <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                placeholderTextColor="#A0A0A0"
                keyboardType="number-pad"
                maxLength={6}
                className="w-full bg-gray-100 px-4 py-3 rounded-xl mb-4 text-gray-800 tracking-widest text-center"
              />
  
              {/* Instructions */}
              <Text className="text-gray-500 text-sm leading-5 mt-2">
                Note: As per banking guidelines, one-time eKYC is required before 
                using domestic money transfer. A fee of ₹10 will be charged.
              </Text>
  
              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-primary rounded-xl py-3 px-6 self-end mt-6 shadow-md"
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
  