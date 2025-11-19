// components/FindRemitterModal.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSearch: (value: string) => void;
}

export default function FindRemitterModal({ visible, onClose, onSearch }: Props) {
  const [mobile, setMobile] = useState("");
  const inputRef = useRef<TextInput>(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start();

      setMobile("");
    }
  }, [visible]);

  const handleSearch = () => {
    if (mobile.length !== 10) return;
    onSearch(mobile);
  };

  return (
    <Modal visible={visible} transparent animationType="none"  >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-end"
      >
        {/* BACKDROP */}
        <Pressable className="flex-1 bg-black/40" onPress={onClose} />

        {/* SHEET */}
        <Animated.View
          style={{ transform: [{ translateY: slideAnim }] }}
          className="bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl relative"
        >
          {/* TOP RIGHT CLOSE BUTTON */}
          <Pressable
            onPress={onClose}
            className="absolute right-5 top-5 bg-gray-100 p-2 rounded-full z-20"
          >
            <Icon name="close" size={20} color="#555" />
          </Pressable>

          {/* HEADER */}
          <Text className="text-xl font-bold text-gray-900 mb-1">
            Find Remitter
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Enter registered mobile number to search
          </Text>

          {/* INPUT SECTION */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
              <Icon name="phone" size={22} color="#666" />

              <TextInput
                ref={inputRef}
                placeholder="Enter mobile number"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                className="ml-3 flex-1 text-base placeholder:text-gray-500"
              />
            </View>

            <Text className="mt-2 text-xs text-gray-400">
              Mobile number must be 10 digits.
            </Text>
          </ScrollView>

          {/* SEARCH BUTTON */}
          <Pressable
            onPress={handleSearch}
            disabled={mobile.length !== 10}
            className={`mt-6 py-4 rounded-2xl 
              ${mobile.length === 10 ? "bg-gray-900" : "bg-gray-400"}`}
          >
            <Text className="text-center text-white font-semibold text-base">
              Search Remitter
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
