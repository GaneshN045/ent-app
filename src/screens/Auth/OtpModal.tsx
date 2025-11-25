// components/auth/OtpModal.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { useVerifyOtpMutation } from '../../services/api/authApi';
import { storage } from '../../utils/storage';

interface OtpModalProps {
  mobile: string;
  otp: string;
  onOtpChange: (text: string) => void;
  onResendPress: () => void;
  onCancelPress: () => void;
  resendTimer: number;
  isVerifyingOtp: boolean;
  isSendingOtp: boolean;
  visible: boolean;
}

export function OtpModal({
  mobile,
  otp,
  onOtpChange,
  onResendPress,
  onCancelPress,
  resendTimer,
  isVerifyingOtp,
  isSendingOtp,
  visible,
}: OtpModalProps) {
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const dispatch = useAppDispatch();
  const isMountedRef = useRef(true);
  const isLoadingRef = useRef(false);
  const [localIsVerifying, setLocalIsVerifying] = React.useState(false);
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Enter a valid 6-digit OTP.');
      return;
    }

    isLoadingRef.current = true;
    setLocalIsVerifying(true);

    try {
      const payload = {
        otp,
        userName: mobile,
      };

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Verification timed out after 30 seconds')), 30000),
      );

      const res: any = await Promise.race([verifyOtpMutation(payload).unwrap(), timeoutPromise]);

      if (res.statusCode !== 200) {
        Alert.alert('Error', res.message || 'Failed to verify OTP');
        if (isMountedRef.current) {
          setLocalIsVerifying(false);
        }
        return;
      }

      const userData: any = res.data;
      const role = userData.role;
      const token = JSON.stringify(userData.token);

      console.log('set_token : ', token);

      console.log('ROLE :', role);

      console.log('userData : ', userData);
      await AsyncStorage.setItem('userRole', role);
      await storage.saveToken(token);
      await storage.saveUserId(userData.hierarchyId);
      if (isMountedRef.current) {
        dispatch(
          login({
            user: {
              id: userData.hierarchyId,
              name: userData.outletName,
              email: userData.emailId,
              role,
            },
            token,
          }),
        );

        onCancelPress();
        isLoadingRef.current = false;
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        Alert.alert(
          'Verification Failed',
          err?.data?.message || err?.message || 'Unable to verify OTP',
        );
        setLocalIsVerifying(false);
        isLoadingRef.current = false;
      }
    }
  };

  const isVerifyDisabled = localIsVerifying || !otp || otp.length !== 6;

  return (
    <TouchableWithoutFeedback onPress={() => !localIsVerifying && onCancelPress()}>
      <View className="flex-1 justify-end bg-black/60">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="bg-white rounded-t-3xl shadow-2xl">
            {/* Handle Bar */}
            <View className="items-center py-4 border-b border-gray-100">
              <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </View>

            {/* Content */}
            <ScrollView
              className="px-6 pb-8"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Icon */}
              <View className="items-center my-6">
                <View className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center shadow-lg">
                  <Text className="text-4xl">📱</Text>
                </View>
              </View>

              {/* Title and Description */}
              <Text className="text-3xl font-bold text-center text-gray-900 mb-3">Enter OTP</Text>
              <Text className="text-sm text-center text-gray-600 mb-2">
                We've sent a 6-digit verification code to
              </Text>
              <Text className="text-base font-semibold text-center text-black mb-8">
                +91 {mobile}
              </Text>

              {/* OTP Input */}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
              >
                <View className="mb-8 relative">
                  <TextInput
                    className="bg-gray-50 rounded-2xl px-6 py-5 text-center text-3xl font-bold border-2 border-gray-200 focus:border-black tracking-widest"
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={text => {
                      onOtpChange(text.replace(/[^0-9]/g, ''));
                      Keyboard.dismiss();
                    }}
                    placeholder="• • • • • •"
                    placeholderTextColor="#D1D5DB"
                    maxLength={6}
                    editable={!localIsVerifying}
                    autoFocus
                    selectTextOnFocus
                  />
                  {otp.length === 6 && (
                    <View className="absolute right-4 top-5">
                      <Text className="text-green-500 text-2xl">✓</Text>
                    </View>
                  )}
                </View>
              </KeyboardAvoidingView>

              {/* Verify Button */}
              <TouchableOpacity
                onPress={handleVerifyOtp}
                disabled={isVerifyDisabled}
                className={`rounded-2xl py-5 items-center justify-center mb-4 shadow-lg ${
                  isVerifyDisabled ? 'bg-gray-300' : 'bg-black'
                }`}
                activeOpacity={0.8}
              >
                {localIsVerifying ? (
                  <View className="flex-row items-center">
                    <ActivityIndicator color="#fff" size="small" />
                    <Text className="text-white font-semibold text-base ml-2">Verifying...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-bold text-base">Verify & Login</Text>
                )}
              </TouchableOpacity>

              {/* Resend OTP */}
              <View className="items-center py-4">
                {resendTimer > 0 ? (
                  <Text className="text-sm text-gray-500">
                    Resend OTP in <Text className="font-semibold text-black">{resendTimer}s</Text>
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={onResendPress}
                    disabled={isSendingOtp || localIsVerifying}
                    className="py-2"
                  >
                    <Text className="text-sm text-gray-600">
                      Didn't receive the code?{' '}
                      <Text className="text-black font-bold">Resend OTP</Text>
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={onCancelPress}
                disabled={localIsVerifying}
                className="py-4 mt-2"
              >
                <Text className="text-center text-gray-400 text-sm font-medium">Cancel</Text>
              </TouchableOpacity>

              {/* Bottom Spacing for Keyboard */}
              <View className="h-4" />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
