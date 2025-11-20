// components/DeleteConfirmModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({ visible, onClose, onConfirm }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          <Text className="text-xl font-bold text-center mb-4 text-red-600">Delete Account?</Text>
          <Text className="text-center text-gray-600 mb-8">This action cannot be undone.</Text>

          <View className="flex-row gap-4">
            <TouchableOpacity onPress={onClose} className="flex-1 bg-gray-200 py-3 rounded-lg">
              <Text className="text-center font-bold text-gray-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} className="flex-1 bg-red-500 py-3 rounded-lg">
              <Text className="text-center text-white font-bold">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
