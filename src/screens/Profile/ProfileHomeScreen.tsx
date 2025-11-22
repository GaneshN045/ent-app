// ProfileHomeScreen.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ProfileAddressModal from './components/ProfileAddressModal';
import ProfileOutletAddressModal from './components/ProfileOutletAddressModal';
import ProfileBanksModal from './components/ProfileBanksModal';
import ProfileKYCDocModal from './components/ProfileKYCDocModal';
import { useGetMemberProfileQuery } from '../../services/api/profileApi';

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

  const MEMBER_ID = 'BZT-RT-001';
  const { data, error, isLoading, refetch } = useGetMemberProfileQuery(MEMBER_ID);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);
  const profile = data?.data;
  const info = profile?.info;

  const kycDocs = React.useMemo(() => {
    const docs = profile?.kycDocs;
    if (!docs) return [];

    return [
      { name: 'Aadhaar Card Front', url: docs.aadhaarCardFrontImage ?? null },
      { name: 'Aadhaar Card Back', url: docs.aadhaarCardBackImage ?? null },
      { name: 'PAN Card', url: docs.panCardImage ?? null },
      { name: 'Shop Image', url: docs.shopImage ?? null },
      { name: 'Business Proof', url: docs.businessProofImage ?? null },
    ];
  }, [profile?.kycDocs]);

  const formatDate = (date?: string) => {
    if (!date) return '-';
    const [y, m, d] = date.split('-');
    if (!y || !m || !d) return date;
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
      <ScrollView
        className="flex-1 bg-gray-50"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Profile Header */}
        <View className="items-center pt-6 pb-8 bg-white">
          <View className="relative">
            <View className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
              <Text className="text-[36px] font-bold text-white uppercase text-center leading-[128px]">
                {info?.name?.[0] ?? 'U'}
              </Text>
            </View>

            {/* Camera Icon */}
            <TouchableOpacity className="absolute bottom-1 right-1 bg-primary rounded-full p-2 shadow-md">
              <MaterialIcons name="camera-alt" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-2xl font-bold text-[#3A3A42] mt-4">{info?.name ?? 'User'}</Text>
          <Text className="text-sm text-[#6E6E76] mt-1">
            Member ID: {info?.memberId ?? MEMBER_ID}
          </Text>
          {isLoading && (
            <View className="mt-2">
              <ActivityIndicator size="small" color="#EB4335" />
            </View>
          )}
        </View>

        {/* Personal Info */}
        <View
          className="mx-4 mt-6 bg-white rounded-3xl p-6 shadow-sm border border-[#ECECF1]"
          style={{ elevation: 3 }}
        >
          <Text className="text-xl font-bold text-[#3A3A42] mb-5">Personal Information</Text>

          <View className="space-y-4">
            <InfoRow label="Mobile Number" value={info?.mobileNumber ?? '-'} />
            <InfoRow label="Email" value={info?.email ?? '-'} />
            <InfoRow label="DOB" value={formatDate(info?.dob ?? '')} />
            <InfoRow label="Outlet Name" value={info?.outletName ?? '-'} />
            <InfoRow
              label="Is Blacklisted"
              value={info?.isBlackList ? 'Yes' : 'No'}
              bold={!!info?.isBlackList}
            />
            <InfoRow
              label="Is Blocked"
              value={info?.isBlocked ? 'Yes' : 'No'}
              bold={!!info?.isBlocked}
            />
          </View>
          {error ? (
            <Text className="text-center text-red-600 mt-4">Failed to load profile details.</Text>
          ) : null}
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
        address={profile?.address}
      />
      <ProfileOutletAddressModal
        key={'outlet_address'}
        visible={outletModal}
        onClose={() => setOutletModal(false)}
        outletAddress={profile?.outletAddress}
      />
      <ProfileBanksModal
        key={'bank'}
        visible={bankModal}
        onClose={() => setBankModal(false)}
        banks={profile?.myBanksList}
      />
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
