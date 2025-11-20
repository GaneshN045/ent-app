// ProfileHomeScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ProfileAddressModal from './components/ProfileAddressModal';
import ProfileOutletAddressModal from './components/ProfileOutletAddressModal';
import ProfileBanksModal from './components/ProfileBanksModal';
import ProfileKYCDocModal from './components/ProfileKYCDocModal';

type Nav = {
  navigate: (screen: string) => void;
};

const menuItems = [
  { title: 'Address', icon: 'location-on', modal: 'address' },
  { title: 'Outlet Address', icon: 'store', modal: 'outlet' },
  { title: 'Bank', icon: 'account-balance', modal: 'bank' },
  { title: 'KYC Docs', icon: 'description', modal: 'kyc' },
];

export default function ProfileHomeScreen() {
  const navigation = useNavigation<Nav>();

  // All modals states
  const [addressModal, setAddressModal] = React.useState(false);
  const [outletModal, setOutletModal] = React.useState(false);
  const [bankModal, setBankModal] = React.useState(false);
  const [kycModal, setKYCModal] = React.useState(false);

  const kycDocs = [
    {
      name: 'Aadhaar Card Front',
      url: 'https://i.imgur.com/5ZCq9bA.jpeg', // Aadhaar front placeholder
    },
    {
      name: 'Aadhaar Card Back',
      url: null, // Aadhaar back placeholder
    },
    {
      name: 'PAN Card',
      url: 'https://i.imgur.com/vKQ9S0p.jpeg', // PAN card placeholder
    },
    {
      name: 'Shop Image',
      url: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1080', // shop front photo
    },
    {
      name: 'Business Proof',
      url: 'https://i.imgur.com/cpGQxYP.jpeg', // business license placeholder
    },
  ];

  const userInfo = {
    name: 'Anurag Chauhan',
    memberNo: 'BZT-RT-001',
    mobile: '8355847323',
    email: 'anurag@gmail.com',
    dob: '1990-02-03',
    outletName: 'Turbhe',
    isBlacklisted: false,
    isBlocked: false,
  };

  const formatDate = (date: string) => {
    const [y, m, d] = date.split('-');
    return `${d}-${m}-${y}`;
  };

  // Modal handler
  const openModal = (type: string) => {
    if (type === 'address') setAddressModal(true);
    else if (type === 'outlet') setOutletModal(true);
    else if (type === 'bank') setBankModal(true);
    else if (type === 'kyc') setKYCModal(true);
  };

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50">
        {/* Profile Header */}
        <View className="items-center pt-6 pb-8 bg-white">
          <View className="relative">
            <View className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {/* Camera Icon */}
            <TouchableOpacity className="absolute bottom-1 right-1 bg-primary rounded-full p-2 shadow-md">
              <MaterialIcons name="camera-alt" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-[#3A3A42] mt-4">{userInfo.name}</Text>
          <Text className="text-sm text-[#6E6E76] mt-1">Member ID: {userInfo.memberNo}</Text>
        </View>

        {/* Personal Info */}
        <View
          className="mx-4 mt-6 bg-white rounded-3xl p-6 shadow-sm border border-[#ECECF1]"
          style={{ elevation: 3 }}
        >
          <Text className="text-xl font-bold text-[#3A3A42] mb-5">Personal Information</Text>

          <View className="space-y-4">
            <InfoRow label="Mobile Number" value={userInfo.mobile} />
            <InfoRow label="Email" value={userInfo.email} />
            <InfoRow label="DOB" value={formatDate(userInfo.dob)} />
            <InfoRow label="Outlet Name" value={userInfo.outletName} />
            <InfoRow
              label="Is Blacklisted"
              value={userInfo.isBlacklisted ? 'Yes' : 'No'}
              bold={userInfo.isBlacklisted}
            />
            <InfoRow
              label="Is Blocked"
              value={userInfo.isBlocked ? 'Yes' : 'No'}
              bold={userInfo.isBlocked}
            />
          </View>
        </View>

        {/* Manage Details */}
        <View className="mx-4 mt-8 pb-32">
          <Text className="text-xl font-bold text-[#3A3A42] mb-4 px-2">Manage Details</Text>

          <View className="flex-row flex-wrap justify-between">
            {menuItems.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => openModal(item.modal)}
                className="w-[48%] mb-5 bg-white rounded-3xl p-6 border border-[#ECECF1] shadow-sm active:opacity-70 items-center"
                style={{ elevation: 3 }}
              >
                <MaterialIcons name={item.icon} size={28} color="#6E6E76" />
                <Text className="text-lg font-semibold text-[#3A3A42] mt-4 text-center">
                  {item.title}
                </Text>
                <Text className="text-sm text-[#9A9AA3] mt-1 text-center">
                  Manage {item.title.toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ALL MODALS — you will replace internals later */}
      <ProfileAddressModal
        key={'address'}
        visible={addressModal}
        onClose={() => setAddressModal(false)}
      />
      <ProfileOutletAddressModal
        key={'outlet_address'}
        visible={outletModal}
        onClose={() => setOutletModal(false)}
      />
      <ProfileBanksModal key={'bank'} visible={bankModal} onClose={() => setBankModal(false)} />
      <ProfileKYCDocModal
        key={'kyc'}
        documents={kycDocs}
        visible={kycModal}
        onClose={() => setKYCModal(false)}
      />
    </>
  );
}

const InfoRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <View className="flex-row justify-between">
    <Text className="text-base text-[#6E6E76] flex-1">{label}:</Text>
    <Text
      className={`text-base text-right flex-1 ${
        bold ? 'font-bold text-red-600' : 'font-medium text-[#3A3A42]'
      }`}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({});
