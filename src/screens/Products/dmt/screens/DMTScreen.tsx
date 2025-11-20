import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../../constants/colors';
import SCREENS from '../../../../constants/screens';
import FindRemitterModal from '../components/FindRemitterModal';

export default function DMTScreen({ navigation }: any) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View className="flex-1 bg-white px-5 py-6">
      {/* HEADER */}
      <View>
        <Text className="text-3xl font-semibold text-primary_gray">Mudra Remit</Text>
        <Text className="text-secondary_gray mt-1 leading-5 text-[13px]">
          As per RBI guidelines, please enter correct sender details. Incorrect information may lead
          to compliance issues.
        </Text>
      </View>

      {/* FIND REMITTER BUTTON CARD */}
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        activeOpacity={0.85}
        className="
                    w-full mt-6
                    bg-white/95
                    rounded-3xl 
                    px-6 py-5   
                    border border-[#F1F1F5]
                    shadow-xl
                    flex-row items-center justify-between shadow-black elevation-lg
                  "
        style={{
          elevation: 3,
        }}
      >
        {/* LEFT TEXT */}
        <View>
          <Text className="text-[20px] font-semibold text-primary_gray tracking-tight">
            Find Remitter
          </Text>

          <Text className="text-secondary_gray text-sm mt-1 leading-[16px]">
            Search customer using mobile number
          </Text>
        </View>

        {/* PREMIUM ICON WRAPPER */}
        <View
          className="
      w-12 h-12 
      rounded-full 
      bg-primary/10 
      items-center justify-center
      shadow-sm shadow-black/10
    "
        >
          <Icon name="search" size={26} color={COLORS.PRIMARY_COLOR} />
        </View>
      </TouchableOpacity>

      {/* TITLE */}
      <Text className="text-lg font-semibold text-primary_gray mt-6 mb-3">Transaction History</Text>

      {/* TRANSACTION LIST */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* SAMPLE CARD */}
        <View
          className="
            bg-white rounded-3xl px-5 py-5 mb-4
            border border-[#ECECF1]
            shadow-sm shadow-gray-300/20
          "
          style={{ elevation: 1 }}
        >
          <View className="flex-row justify-between mb-3">
            <Text className="text-primary_gray font-medium">Date/Time</Text>
            <Text className="text-primary_gray">12 Oct 2024 • 4:30 PM</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-secondary_gray">Account No</Text>
            <Text className="text-primary_gray">XXXX 2234</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-secondary_gray">Beneficiary</Text>
            <Text className="text-primary_gray">Rohit Sharma</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-secondary_gray">Amount</Text>
            <Text className="text-primary_gray">₹1,500</Text>
          </View>

          <View className="mt-3 self-start bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 font-medium">Success</Text>
          </View>
        </View>
      </ScrollView>

      {/* ========================= MODAL ========================= */}
      <FindRemitterModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        onSearch={mobile => {
          console.log('Searching:', mobile);
          navigation.navigate(SCREENS.ADD_REMITTER_SCREEN);
          setOpenModal(false);
        }}
      />
    </View>
  );
}
