// File: @src/screens/Reports/commission_charges/components/inputs/SelectInput.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

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
  placeholder?: string;
  identifier: string;
  activeSelect?: string | null;
  onDropdownToggle?: (identifier: string | null) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = 'Search...',
  identifier,
  activeSelect,
  onDropdownToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!activeSelect && isOpen) {
      setIsOpen(false);
      setSearchQuery('');
      return;
    }

    if (activeSelect && activeSelect !== identifier && isOpen) {
      setIsOpen(false);
      setSearchQuery('');
    }
  }, [activeSelect, identifier, isOpen]);

  // Filter options based on search query
  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get selected label
  const selectedLabel = options.find(opt => opt.value === value)?.label || 'Select...';

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
    onDropdownToggle?.(null);
  };

  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    onDropdownToggle?.(willOpen ? identifier : null);
  };

  return (
    <View className="w-full mb-4">
      {/* Label */}
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>

      {/* Input Button */}
      <TouchableOpacity
        onPress={handleToggle}
        className={`
          flex-row items-center justify-between
          rounded-xl px-4 py-3.5
          bg-white
          ${error ? 'border border-red-400' : 'border border-gray-200'}
        `}
        style={{
          elevation: 1,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 1 },
        }}
      >
        <Text
          className={`text-base ${value ? 'text-gray-800' : 'text-gray-400'}`}
          numberOfLines={1}
        >
          {selectedLabel}
        </Text>
        <Text className="text-gray-400 text-lg ml-2">{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown Menu - Now Relative Position */}
      {isOpen && activeSelect === identifier && (
        <View
          className="bg-white rounded-xl mt-2 border border-gray-200"
          style={{
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          {/* Search Input */}
          <View className="p-3 border-b border-gray-100">
            <TextInput
              className="bg-gray-50 rounded-lg px-4 py-2.5 text-base text-gray-800"
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              // autoFocus
            />
          </View>

          {/* Options List */}
          <ScrollView
            className="max-h-48"
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => handleSelect(opt.value)}
                  className={`
                    px-4 py-3.5 border-b border-gray-50
                    ${value === opt.value ? 'bg-blue-50' : ''}
                  `}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-base ${
                      value === opt.value ? 'font-semibold text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View className="px-4 py-8">
                <Text className="text-gray-400 text-center text-base">No results found</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* Error message */}
      {error && <Text className="text-red-500 text-xs mt-1.5 ml-1">{error}</Text>}
    </View>
  );
};

export default SelectInput;
