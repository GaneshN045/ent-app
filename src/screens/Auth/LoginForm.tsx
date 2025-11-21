// components/auth/LoginForm.tsx
import React, { useMemo, useRef } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useSendOtpMutation } from '../../services/api/authApi';
import { encryptText } from '../../utils/encryption';

interface LoginFormProps {
  mobile: string;
  onMobileChange: (text: string) => void;
  password: string;
  onPasswordChange: (text: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  isSendingOtp: boolean;
  onOtpSent: (otp: string, role: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function LoginForm({
  mobile,
  onMobileChange,
  password,
  onPasswordChange,
  showPassword,
  onToggleShowPassword,
  isSendingOtp,
  onOtpSent,
  onLoadingChange,
}: LoginFormProps) {
  const [sendOtpMutation] = useSendOtpMutation();
  const isMountedRef = useRef(true);
  const isLoadingRef = useRef(false);

  const encryptedUsernameData = useMemo(() => encryptText(mobile), [mobile]);
  const encryptedPasswordData = useMemo(() => encryptText(password), [password]);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSendOtp = async () => {
    if (!mobile || mobile.length < 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Validation Error', 'Please enter a valid password (minimum 6 characters).');
      return;
    }

    isLoadingRef.current = true;
    onLoadingChange(true);
    Keyboard.dismiss();

    try {
      const payload = {
        userName: encryptedUsernameData.encrypted,
        password: encryptedPasswordData.encrypted,
        salt: encryptedUsernameData.salt,
        iv: encryptedUsernameData.iv,
        url: 'https://uat.decipay.in/',
      };

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('OTP request timed out after 30 seconds')),
          30000
        )
      );

      const json: any = await Promise.race([
        sendOtpMutation(payload).unwrap(),
        timeoutPromise,
      ]);

      if (!json || json.statusCode !== 200 || !json.data || !json.data.otp) {
        const errorMsg = json?.message || 'Failed to send OTP. Please try again.';
        Alert.alert('Error', errorMsg);
        if (isMountedRef.current) {
          onLoadingChange(false);
        }
        return;
      }

      const otpFromServer = String(json.data.otp);
      const roleFromServer = json.data.role || 'EN';

      if (isMountedRef.current) {
        onOtpSent(otpFromServer, roleFromServer);
        onLoadingChange(false);
        isLoadingRef.current = false;
      }
    } catch (e: any) {
      if (isMountedRef.current) {
        const errorMessage =
          e?.data?.message || e?.message || 'Unable to send OTP. Please try again.';
        Alert.alert('Error', errorMessage);
        onLoadingChange(false);
        isLoadingRef.current = false;
      }
    }
  };

  const isLoginDisabled = isSendingOtp || !mobile || !password || mobile.length < 10 || password.length < 6;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center">
        {/* Logo/Header Section */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-black rounded-3xl items-center justify-center mb-6 shadow-lg">
            <Text className="text-4xl">🔐</Text>
          </View>
          <Text className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</Text>
          <Text className="text-base text-gray-500">Sign in to continue to your account</Text>
        </View>

        {/* Login Form */}
        <View className="mb-6">
          {/* Mobile Input */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Mobile Number</Text>
            <View className="relative">
              <TextInput
                className="bg-white rounded-2xl px-5 py-4 text-base text-gray-900 border-2 border-gray-200 focus:border-black"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={(text) => onMobileChange(text.replace(/[^0-9]/g, ''))}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#9CA3AF"
                maxLength={10}
                editable={!isSendingOtp}
              />
              {mobile.length === 10 && (
                <View className="absolute right-4 top-4">
                  <Text className="text-green-500 text-xl">✓</Text>
                </View>
              )}
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
            <View className="relative">
              <TextInput
                className="bg-white rounded-2xl px-5 py-4 pr-14 text-base text-gray-900 border-2 border-gray-200 focus:border-black"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={onPasswordChange}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                editable={!isSendingOtp}
              />
              <TouchableOpacity
                onPress={onToggleShowPassword}
                className="absolute right-4 top-4"
                disabled={isSendingOtp}
              >
                <Text className="text-gray-400 text-lg">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSendOtp}
            disabled={isLoginDisabled}
            className={`rounded-2xl py-4 items-center justify-center shadow-lg ${
              isLoginDisabled ? 'bg-gray-300' : 'bg-black'
            }`}
            activeOpacity={0.8}
          >
            {isSendingOtp ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="#fff" size="small" />
                <Text className="text-white font-semibold text-base ml-2">Sending OTP...</Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-base">Continue with OTP</Text>
            )}
          </TouchableOpacity>

          {/* Help Text */}
          <View className="mt-6 items-center">
            <Text className="text-sm text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}