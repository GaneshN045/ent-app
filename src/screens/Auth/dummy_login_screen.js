import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { Role, ROLE_HIERARCHY } from '../../navigation/menuConfig';
import { useSendOtpMutation } from '../../services/api/authApi';
import { encryptCredentials } from '../../utils/encryption';

const ROLE_LABELS: Record<Role, string> = {
  WL: 'White Label',
  SD: 'Super Distributor',
  DT: 'Distributor',
  PT: 'Partner',
  EN: 'Enterprise',
  RT: 'Retailer',
  RA: 'Retail Agent',
};

const ROLE_COLORS: Record<Role, string> = {
  WL: '#FF6B6B',
  SD: '#4ECDC4',
  DT: '#45B7D1',
  PT: '#FFA07A',
  EN: '#98D8C8',
  RT: '#2196F3',
  RA: '#7C3AED',
};

const DEV_ACCOUNTS: Record<Role, { mobile: string; password: string; otp: string }> = {
  WL: { mobile: '9000000001', password: 'dev123', otp: '111111' },
  SD: { mobile: '9000000002', password: 'dev123', otp: '222222' },
  DT: { mobile: '9000000003', password: 'dev123', otp: '333333' },
  PT: { mobile: '9000000004', password: 'dev123', otp: '444444' },
  EN: { mobile: '9000000005', password: 'dev123', otp: '555555' },
  RT: { mobile: '9000000006', password: 'dev123', otp: '666666' },
  RA: { mobile: '9000000007', password: 'dev123', otp: '777777' },
};

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [sendOtpMutation] = useSendOtpMutation();

  const handleRoleSelect = async (role: Role) => {
    try {
      setSelectedRole(role);
      setIsLoading(true);

      const uniqueId = `user_${role}_${Date.now()}`;
      const token = `token_${role}_${Date.now()}`;

      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('userId', uniqueId);

      dispatch(
        login({
          user: {
            id: uniqueId,
            name: ROLE_LABELS[role],
            email: `${role}@app.com`,
            role,
          },
          token,
        }),
      );

      // Alert.alert("Success", `Logged in as ${ROLE_LABELS[role]}`);
    } catch (e) {
      Alert.alert('Error', 'Failed to set role. Please try again.');
      setSelectedRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (mobileValue: string, passwordValue: string) => {
    const mobileToUse = mobileValue;
    const passwordToUse = passwordValue;

    console.log('sendingotp....')

    if (!mobileToUse || !passwordToUse) {
      Alert.alert('Error', 'Please enter mobile and password first.');
      return;
    }

    try {
      setIsSendingOtp(true);

      console.log('sending otp 1')

      const { salt, iv, encryptedUsername, encryptedPassword } = encryptCredentials(
        mobileToUse,
        passwordToUse,
      );

      console.log('encryptedUsername :', encryptedUsername)
      console.log('encryptedPassword :', encryptedPassword)


      const payload = {
        userName: encryptedUsername,
        password: encryptedPassword,
        salt,
        iv,
        url: 'https://uat.decipay.in/',
      };

      console.log('[SEND OTP] triggering mutation with payload', payload);

      const json = await sendOtpMutation(payload).unwrap();

      if (!json || json.statusCode !== 200 || !json.data || !json.data.otp) {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
        return;
      }

      const otpFromServer = String(json.data.otp);
      setServerOtp(otpFromServer);
      setOtp(otpFromServer);
      setIsOtpModalVisible(true);
    } catch (e) {
      Alert.alert('Error', 'Unable to send OTP. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleDevRolePress = (role: Role) => {
    const devAccount = DEV_ACCOUNTS[role];

    setSelectedRole(role);
    setMobile(devAccount.mobile);
    setPassword(devAccount.password);
    setOtp('');
    sendOtp(devAccount.mobile, devAccount.password);
  };

  const handleSendOtp = () => {
    sendOtp(mobile, password);
  };

  const handleVerifyOtp = async () => {
    if (!serverOtp) {
      Alert.alert('Error', 'Please send OTP first.');
      return;
    }

    if (otp !== serverOtp) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      return;
    }

    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role (dev mode) to continue.');
      return;
    }

    try {
      setIsVerifyingOtp(true);

      await handleRoleSelect(selectedRole);
      setIsOtpModalVisible(false);
      setOtp('');
      setServerOtp(null);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100" contentContainerStyle={{ padding: 20 }}>
      {/* Header */}
      <View className="items-center mb-10 mt-8">
        <Text className="text-4xl font-bold text-black">Login</Text>
        <Text className="text-base text-gray-600 mt-1">Enter your details to continue</Text>
      </View>

      <View className="mb-8">
        <Text className="text-sm text-gray-700 mb-2">Mobile</Text>
        <TextInput
          className="bg-white rounded-lg px-4 py-3 border border-gray-300"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          placeholder="Enter mobile number"
        />
        <Text className="text-sm text-gray-700 mt-4 mb-2">Password</Text>
        <TextInput
          className="bg-white text-gray-600 rounded-lg px-4 py-3 border border-gray-300"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
        />
        <TouchableOpacity
          onPress={handleSendOtp}
          disabled={isSendingOtp || isLoading}
          className="mt-4 bg-black rounded-lg py-3 items-center justify-center"
        >
          {isSendingOtp ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Send OTP</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Roles Grid */}
      <View className="flex-row flex-wrap justify-between mb-10">
        {ROLE_HIERARCHY.map(role => {
          const isSelected = selectedRole === role;

          return (
            <TouchableOpacity
              key={role}
              disabled={isLoading}
              onPress={() => handleDevRolePress(role)}
              className={`w-[48%] p-6 rounded-xl mb-4 items-center justify-center 
                shadow-md
                ${isSelected ? 'border-2 border-black' : ''}`}
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
        <Text className="text-yellow-800 font-semibold">⚠️ Development/Test Mode</Text>
        <Text className="text-yellow-700 text-sm mt-1 leading-5">
          Roles are set manually for development. Production login uses real credentials.
        </Text>
      </View>

      <Modal
        visible={isOtpModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOtpModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-11/12 bg-white rounded-2xl p-6">
            <Text className="text-xl font-semibold text-black mb-2">Enter OTP</Text>
            <Text className="text-sm text-gray-600 mb-4">
              We have sent an OTP to your mobile number.
            </Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-3 border border-gray-300"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter OTP"
              maxLength={6}
            />
            <View className="flex-row justify-end mt-6">
              <TouchableOpacity
                onPress={() => {
                  setIsOtpModalVisible(false);
                  setOtp('');
                }}
                className="mr-4 px-4 py-2 rounded-lg bg-gray-200"
              >
                <Text className="text-gray-800">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleVerifyOtp}
                disabled={isVerifyingOtp || isLoading}
                className="px-4 py-2 rounded-lg bg-black"
              >
                {isVerifyingOtp ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-semibold">Verify OTP</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
