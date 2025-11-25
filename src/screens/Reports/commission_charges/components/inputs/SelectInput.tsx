// File: @src/screens/Reports/commission_charges/components/inputs/SelectInput.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <View className="relative">
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          className={`border rounded-lg px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
        >
          <Text className="text-sm text-gray-700">
            {options.find(opt => opt.value === value)?.label || 'Select...'}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-50 max-h-40">
            <ScrollView>
              {options.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 border-b border-gray-200"
                >
                  <Text
                    className={value === opt.value ? 'font-bold text-blue-600' : 'text-gray-700'}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
};

export default SelectInput;
