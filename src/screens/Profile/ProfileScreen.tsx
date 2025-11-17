import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

type Nav = {
  navigate: (screen: string) => void
}

const menuItems = [
  { title: 'Address', icon: 'location-on', screen: 'AddressScreen' },
  { title: 'Outlet Address', icon: 'store', screen: 'OutletAddressScreen' },
  { title: 'Bank', icon: 'account-balance', screen: 'BankScreen' },
  { title: 'KYC Docs', icon: 'description', screen: 'KYCDocsScreen' },
]

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>()

  const userInfo = {
    name: 'Anurag Chauhan',
    memberNo: 'BZT-RT-001',
    mobile: '8355847323',
    email: 'anurag@gmail.com',
    dob: '1990-02-03',
    outletName: 'Turbhe',
    isBlacklisted: false,
    isBlocked: false,
  }

  const formatDate = (date: string) => {
    const [y, m, d] = date.split('-')
    return `${d}-${m}-${y}`
  }

  return (
    <>

      <ScrollView className="flex-1 bg-gray-50">
        {/* Profile Header with Image */}
        <View className="items-center pt-6 pb-8 bg-white">
          <View className="relative">
            {/* Profile Image - Replace with your actual image source later */}
            <View className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} // fallback demo image
                // source={require('../../assets/profile.jpg')} // use local image
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            {/* Camera Icon Overlay */}
            <TouchableOpacity className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-2 shadow-md">
              <MaterialIcons name="camera-alt" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Name & Member ID */}
          <Text className="text-2xl font-bold text-[#3A3A42] mt-4">{userInfo.name}</Text>
          <Text className="text-sm text-[#6E6E76] mt-1">Member ID: {userInfo.memberNo}</Text>
        </View>

        {/* Personal Info Card */}
        <View className="mx-4 mt-6 bg-white rounded-3xl p-6 shadow-sm border border-[#ECECF1]" style={{ elevation: 3 }}>
          <Text className="text-xl font-bold text-[#3A3A42] mb-5">Personal Information</Text>

          <View className="space-y-4">
            <InfoRow label="Mobile Number" value={userInfo.mobile} />
            <InfoRow label="Email" value={userInfo.email} />
            <InfoRow label="DOB" value={formatDate(userInfo.dob)} />
            <InfoRow label="Outlet Name" value={userInfo.outletName} />
            <InfoRow label="Is Blacklisted" value={userInfo.isBlacklisted ? 'Yes' : 'No'} bold={userInfo.isBlacklisted} />
            <InfoRow label="Is Blocked" value={userInfo.isBlocked ? 'Yes' : 'No'} bold={userInfo.isBlocked} />
          </View>
        </View>

        {/* Manage Details Section */}
        <View className="mx-4 mt-8 pb-10">
          <Text className="text-xl font-bold text-[#3A3A42] mb-4 px-2">Manage Details</Text>

          <View className="flex-row flex-wrap justify-between">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item.screen)}
                className="w-[48%] mb-5 bg-white rounded-3xl p-6 border border-[#ECECF1] shadow-sm active:opacity-70 items-center"
                style={{ elevation: 3 }}
              >
                <MaterialIcons name={item.icon} size={36} color="#6E6E76" />
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
    </>
  )
}

const InfoRow = ({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) => (
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
)

const styles = StyleSheet.create({})