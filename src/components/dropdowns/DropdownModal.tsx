import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

export type DropdownModalProps = {
  visible: boolean;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
};

export function DropdownModal({ visible, options, onSelect, onClose }: DropdownModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} className="bg-white rounded-2xl p-0 w-[80%] shadow-lg">
          <View className="border-b border-gray-200 px-6 py-4">
            <Text className="text-gray-800 font-semibold text-lg">Select Option</Text>
          </View>
          <FlatList
            data={options}
            keyExtractor={item => item}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className={`py-4 px-6 ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text className="text-gray-700 text-base">{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity className="border-t border-gray-200 py-5 px-6" onPress={onClose}>
            <Text className="text-center text-red-500 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
