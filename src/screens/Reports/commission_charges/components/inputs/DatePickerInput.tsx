// File: @src/screens/Reports/commission_charges/components/inputs/DatePickerInput.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

interface DatePickerInputProps {
  label: string;
  value: any;
  onChange: (date: string) => void;
  error?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ label, value, onChange, error }) => {
  return (
    <View>
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={value}
        onChangeText={onChange}
        className={`border rounded-lg px-3 py-2 text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

export default DatePickerInput;
