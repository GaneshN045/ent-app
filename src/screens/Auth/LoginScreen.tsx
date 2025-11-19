import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";
import { Role, ROLE_HIERARCHY } from "../../navigation/menuConfig";

const ROLE_LABELS: Record<Role, string> = {
  WL: "White Label",
  SD: "Super Distributor",
  DT: "Distributor",
  PT: "Partner",
  EN: "Enterprise",
  RT: "Retailer",
  RA: "Retail Agent",
};

const ROLE_COLORS: Record<Role, string> = {
  WL: "#FF6B6B",
  SD: "#4ECDC4",
  DT: "#45B7D1",
  PT: "#FFA07A",
  EN: "#98D8C8",
  RT: "#2196F3",
  RA: "#7C3AED",
};

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleRoleSelect = async (role: Role) => {
    try {
      setSelectedRole(role);
      setIsLoading(true);

      const uniqueId = `user_${role}_${Date.now()}`;
      const token = `token_${role}_${Date.now()}`;

      await AsyncStorage.setItem("userRole", role);
      await AsyncStorage.setItem("userId", uniqueId);

      dispatch(
        login({
          user: {
            id: uniqueId,
            name: ROLE_LABELS[role],
            email: `${role}@app.com`,
            role,
          },
          token,
        })
      );

      // Alert.alert("Success", `Logged in as ${ROLE_LABELS[role]}`);
    } catch (e) {
      Alert.alert("Error", "Failed to set role. Please try again.");
      setSelectedRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" contentContainerStyle={{ padding: 20 }}>
      {/* Header */}
      <View className="items-center mb-10 mt-8">
        <Text className="text-4xl font-bold text-black">Select Your Role</Text>
        <Text className="text-base text-gray-600 mt-1">Choose a role to continue</Text>
      </View>

      {/* Roles Grid */}
      <View className="flex-row flex-wrap justify-between mb-10">
        {ROLE_HIERARCHY.map((role) => {
          const isSelected = selectedRole === role;

          return (
            <TouchableOpacity
              key={role}
              disabled={isLoading}
              onPress={() => handleRoleSelect(role)}
              className={`w-[48%] p-6 rounded-xl mb-4 items-center justify-center 
                shadow-md
                ${isSelected ? "border-2 border-black" : ""}`}
              style={{ backgroundColor: ROLE_COLORS[role] }}
            >
              {isSelected && isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white font-bold text-lg">{role}</Text>
                  <Text className="text-white text-sm font-medium mt-1">{ROLE_LABELS[role]}</Text>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Info Box */}
      <View className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
        <Text className="text-yellow-800 font-semibold">
          ⚠️ Development/Test Mode
        </Text>
        <Text className="text-yellow-700 text-sm mt-1 leading-5">
          Roles are set manually for development. Production login uses real credentials.
        </Text>
      </View>
    </ScrollView>
  );
}
