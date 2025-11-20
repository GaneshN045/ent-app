import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AEPSScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const aepsServiceType = route.params?.aeps_service_type;
  const aepsServiceLabel = route.params?.aeps_service_label ?? aepsServiceType;
  const aepsVendor = route.params?.aeps_vendor;

  const [aadhaar, setAadhaar] = useState('');
  const [device, setDevice] = useState('');
  const [isCSP, setIsCSP] = useState(false);

  const deviceOptions = ['Mantra', 'Morpho', 'Precision', 'Startek', 'Tatvik', 'SecuGen', 'Cogent'];

  const validateAndSubmit = () => {
    if (!aadhaar || aadhaar.length !== 12) {
      Alert.alert('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (!device) {
      Alert.alert('Please select a biometric device.');
      return;
    }
    if (!isCSP) {
      Alert.alert('Please check the CSP box.');
      return;
    }

    Alert.alert('Validation Successful!');
  };

  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <View className="px-5 py-4 bg-white rounded-b-3xl">
        <Text className="text-primary_gray text-2xl font-bold">Two Factor Authentication</Text>
        <Text className="text-secondary_gray text-sm mt-1">
          Verify Aadhaar using biometric device
        </Text>
      </View>

      <View className=" bg-[#F7F8FA] px-5 pt-6">
        {/* Route Info */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-5">
          <Text className="text-gray-600 font-medium">
            AEPS Vendor: <Text className="font-semibold">{aepsVendor}</Text>
          </Text>
          <Text className="text-gray-600 font-medium mt-1">
            Service: <Text className="font-semibold">{aepsServiceLabel}</Text>
          </Text>
        </View>

        {/* Fingerprint Icon Box */}
        {/* <View className="items-center mb-6">
                <View className="w-28 h-28 bg-red-50 rounded-2xl items-center justify-center border border-red-200">
                    <MaterialIcons name="fingerprint" size={70} color="#DC2626" />
                </View>
            </View> */}

        {/* Aadhaar Input */}
        <View className="mb-5">
          <Text className="text-gray-700 font-semibold mb-2">Aadhaar Number</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={12}
            value={aadhaar}
            onChangeText={t => setAadhaar(t.replace(/[^0-9]/g, ''))}
            placeholder="Enter 12-digit Aadhaar"
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm placeholder:text-gray-500"
          />
        </View>

        {/* Device Selection */}
        <Text className="text-gray-700 font-semibold mb-3">Select Biometric Device</Text>

        <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
          {deviceOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setDevice(item)}
              className={`flex-row items-center px-4 py-3 mb-2 rounded-xl border ${
                device === item ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
              }`}
            >
              <MaterialIcons
                name={device === item ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={22}
                color={device === item ? '#DC2626' : '#6B7280'}
              />

              <Text
                className={`ml-3 text-base ${
                  device === item ? 'text-red-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CSP Checkbox */}
        <TouchableOpacity onPress={() => setIsCSP(!isCSP)} className="flex-row items-center mb-6">
          <View
            className={`w-6 h-6 rounded-md border mr-3 ${
              isCSP ? 'bg-red-600 border-red-600' : 'border-gray-400'
            }`}
          >
            {isCSP && (
              <MaterialIcons
                name="check"
                size={18}
                color="#fff"
                style={{ alignSelf: 'center', marginTop: 2 }}
              />
            )}
          </View>
          <Text className="text-gray-700 font-medium text-base">C.S.P</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={validateAndSubmit}
          className="bg-white border border-primary p-4 rounded-2xl shadow-md active:opacity-80"
        >
          <Text className="text-primary text-center font-semibold text-base">Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
