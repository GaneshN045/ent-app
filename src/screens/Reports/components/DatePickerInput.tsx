// File: @src/screens/Reports/commission_charges/components/inputs/DatePickerInput.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../constants/colors';

interface DatePickerInputProps {
  label: string;
  value: any;
  onChange: (date: string) => void;
  error?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ label, value, onChange, error }) => {
  const [open, setOpen] = useState(false);

  const parsedDate = value ? new Date(value) : new Date();
  const baseDate = Number.isFinite(parsedDate.getTime()) ? parsedDate : new Date();

  const displayText = value ? value : 'Select date';

  const handleConfirm = (date: Date) => {
    onChange(date.toISOString().split('T')[0]);
    setOpen(false);
  };

  return (
    <View className="w-full">
      {/* Label */}
      <Text className="text-base font-semibold text-gray-600 mb-2">{label}</Text>

      {/* Input */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className={`
          flex-row items-center justify-between
          rounded-lg px-4 py-4 bg-white
          ${error ? 'border border-red-500' : 'border border-gray-300'}
        `}
        style={{
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text className={`text-[15px] ${value ? 'text-gray-800' : 'text-gray-600'}`}>
          {displayText}
        </Text>

        <Icon name="event" size={22} color={'#6b7280'} />
      </TouchableOpacity>

      {/* Error */}
      {error && <Text className="text-red-500 text-sm mt-2">{error}</Text>}

      {/* Actual Date Picker Modal */}
      <DatePicker
        modal
        open={open}
        date={baseDate}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

export default DatePickerInput;
