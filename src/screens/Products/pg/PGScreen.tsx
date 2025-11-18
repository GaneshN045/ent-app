import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../../constants/colors";
import PGScreenForm from "./PGScreenForm";

export default function PGScreen() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedOption, setSelectedOption] =
    useState<"card" | "other" | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const handleOptionSelect = (option: "card" | "other") => {
    setSelectedOption(option);

    if (option === "other") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        setFormVisible(true);
      }, 1200);
    }
  };

  const handleCardSubmit = () => {
    if (cardNumber.length < 12) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(false);
      setFormVisible(true);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-[#F8F8FB] px-5">
      {/* --------------------- MODAL --------------------- */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent={true}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View
            className="
              w-[85%] p-6 
              bg-white rounded-3xl 
              border border-gray-200
              shadow-lg shadow-black/10
            "
          >
            <Text className="text-xl font-semibold text-gray-800 text-center">
              Select Payment Type
            </Text>

            {/* Options */}
            {!selectedOption && (
              <View className="mt-6">
                {/* Card */}
                <TouchableOpacity
                  className="
                    flex-row items-center 
                    bg-gray-50 p-4 rounded-2xl mb-3
                    border border-gray-200
                  "
                  onPress={() => handleOptionSelect("card")}
                >
                  <Icon name="credit-card" size={26} color={COLORS.GRAY_ICON} />
                  <Text className="text-gray-700 text-lg ml-3">Card</Text>
                </TouchableOpacity>

                {/* Other */}
                <TouchableOpacity
                  className="
                    flex-row items-center 
                    bg-gray-50 p-4 rounded-2xl
                    border border-gray-200
                  "
                  onPress={() => handleOptionSelect("other")}
                >
                  <Icon name="apps" size={26} color={COLORS.GRAY_ICON} />
                  <Text className="text-gray-700 text-lg ml-3">Other</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Card Input */}
            {selectedOption === "card" && !loading && (
              <View className="mt-6">
                <Text className="text-gray-600 mb-2">Enter Card Number</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={16}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="
                    p-4 bg-gray-50 rounded-2xl 
                    border border-gray-200
                    text-gray-800 tracking-widest
                  "
                />

                <TouchableOpacity
                  disabled={cardNumber.length < 12}
                  onPress={handleCardSubmit}
                  className="
                    mt-5 bg-black py-3 rounded-2xl
                  "
                >
                  <Text className="text-white text-center text-lg font-semibold">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Loader */}
            {loading && (
              <View className="mt-6 items-center">
                <ActivityIndicator
                  size="large"
                  color={COLORS.PRIMARY_COLOR}
                />
                <Text className="text-gray-500 mt-3">Please wait...</Text>
              </View>
            )}

            {/* Cancel Button */}
            {!loading && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="
                  mt-6 py-3 
                  rounded-2xl border border-gray-300
                "
              >
                <Text className="text-gray-700 text-center text-lg font-medium">
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* MAIN FORM SECTION */}
      {formVisible && <PGScreenForm />}
    </View>
  );
}
