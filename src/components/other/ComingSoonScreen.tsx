import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function ComingSoonScreen() {
    const navigation = useNavigation<any>()

    return (
        <View className="flex-1 bg-white items-center pt-[40%] px-10">

            {/* Subtle Icon Container */}
            <View className="bg-gray-100 p-6 rounded-3xl mb-8 shadow-sm">
                <Icon name="hourglass-empty" size={40} color={COLORS.PRIMARY_COLOR} />
            </View>

            {/* Title */}
            <Text className="text-3xl font-extrabold text-gray-800 tracking-tight mb-3">
                Coming Soon
            </Text>

            {/* Subtitle */}
            <Text className="text-gray-500 text-center text-base leading-6 mb-10">
                We're crafting something new and refined.
                Stay tuned for the next update.
            </Text>

            {/* Back Button - subtle, minimal */}
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
                className="rounded-2xl px-10 py-3 bg-white shadow-md border border-primary"
            >
                <Text className="text-primary text-base font-semibold">
                    Go Back
                </Text>
            </TouchableOpacity>
        </View>
    );
}
