import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { Role } from '../../navigation/menuConfig';
import { useSendOtpMutation, useVerifyOtpMutation } from '../../services/api/authApi';
import { encryptText } from '../../utils/encryption';

const ROLE_LABELS: Record<Role, string> = {
  WL: 'White Label',
  SD: 'Super Distributor',
  DT: 'Distributor',
  PT: 'Partner',
  EN: 'Enterprise',
  RT: 'Retailer',
  RA: 'Retail Agent',
};

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState('8355847323');
  const [password, setPassword] = useState('Test@111');
  const [otp, setOtp] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const dispatch = useAppDispatch();
  const [sendOtpMutation] = useSendOtpMutation();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const isMountedRef = useRef(true);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Auto-fill OTP when received
  useEffect(() => {
    if (serverOtp && isOtpModalVisible) {
      setOtp(serverOtp);
    }
  }, [serverOtp, isOtpModalVisible]);

  const handleLogin = async (role: Role) => {
    try {
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
    } catch (e) {
      Alert.alert('Login Error', 'Failed to login. Please try again.');
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  const handleSendOtp = async () => {
    // Validation
    if (!mobile || mobile.length < 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Validation Error', 'Please enter a valid password (minimum 6 characters).');
      return;
    }

    // CRITICAL: Update both ref and state IMMEDIATELY
    isLoadingRef.current = true;
    setIsSendingOtp(true);
    console.log('✋ Button clicked - Loading started');
    Keyboard.dismiss();

    try {

      // Encrypt username and password
      const encryptedUsernameData = encryptText(mobile);
      const encryptedPasswordData = encryptText(password);

      const payload = {
        userName: encryptedUsernameData.encrypted,
        password: encryptedPasswordData.encrypted,
        salt: encryptedUsernameData.salt,
        iv: encryptedUsernameData.iv,
        url: 'https://uat.decipay.in/',
      };

      console.log('🔄 Sending OTP request...');

      // Create a race between the API call and a timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('OTP request timed out after 30 seconds')),
          30000
        )
      );

      const json : any = await Promise.race([
        sendOtpMutation(payload).unwrap(),
        timeoutPromise,
      ]);

      console.log('✅ OTP Response:', json);

      if (!json || json.statusCode !== 200 || !json.data || !json.data.otp) {
        const errorMsg = json?.message || 'Failed to send OTP. Please try again.';
        Alert.alert('Error', errorMsg);
        if (isMountedRef.current) {
          setIsSendingOtp(false);
        }
        return;
      }

      const otpFromServer = String(json.data.otp);
      const roleFromServer = (json.data.role as Role) || 'EN';

      if (isMountedRef.current) {
        setServerOtp(otpFromServer);
        setUserRole(roleFromServer);
        setIsOtpModalVisible(true);
        setResendTimer(60);
        setIsSendingOtp(false);
        isLoadingRef.current = false;
      }

      console.log('✅ OTP sent successfully');
    } catch (e: any) {
      console.error('❌ OTP Error:', e);
      
      if (isMountedRef.current) {
        const errorMessage =
          e?.data?.message || e?.message || 'Unable to send OTP. Please try again.';
        Alert.alert('Error', errorMessage);
        setIsSendingOtp(false);
        isLoadingRef.current = false;
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Enter a valid 6-digit OTP.');
      return;
    }

    isLoadingRef.current = true;
    setIsVerifyingOtp(true);
    console.log('✋ Verify clicked - Loading started');

    try {
      const payload = {
        otp,
        userName: mobile,
      };

      console.log('🔄 Verifying OTP...');

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Verification timed out after 30 seconds')),
          30000
        )
      );

      const res : any = await Promise.race([
        verifyOtpMutation(payload).unwrap(),
        timeoutPromise,
      ]);

      console.log('✅ Verification Response:', res);

      if (res.statusCode !== 200) {
        Alert.alert('Error', res.message || 'Failed to verify OTP');
        if (isMountedRef.current) {
          setIsVerifyingOtp(false);
        }
        return;
      }

      // Extract user data
      const userData: any = res.data;
      const role = userData.role;
      const token = userData.token;

      // Save everything to AsyncStorage
      await AsyncStorage.setItem('userRole', role);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('hierarchyId', userData.hierarchyId);

      if (isMountedRef.current) {
        // Login to Redux
        dispatch(
          login({
            user: {
              id: mobile,
              name: userData.outletName,
              email: userData.emailId,
              role,
            },
            token,
          })
        );

        // Close modal
        resetModal();
        isLoadingRef.current = false;
      }

      console.log('✅ Login successful');
    } catch (err: any) {
      console.error('❌ VERIFY ERROR:', err);
      if (isMountedRef.current) {
        Alert.alert(
          'Verification Failed',
          err?.data?.message || err?.message || 'Unable to verify OTP'
        );
        setIsVerifyingOtp(false);
        isLoadingRef.current = false;
      }
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) {
      return;
    }
    await handleSendOtp();
  };

  const resetModal = () => {
    setIsOtpModalVisible(false);
    setOtp('');
    setServerOtp(null);
    setResendTimer(0);
    setIsSendingOtp(false);
  };

  const isLoginDisabled =
    isSendingOtp || isLoading || !mobile || !password || mobile.length < 10 || password.length < 6;
  const isVerifyDisabled = isVerifyingOtp || isLoading || !otp || otp.length !== 6;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
                    onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor="#9CA3AF"
                    maxLength={10}
                    editable={!isSendingOtp && !isLoading}
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
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    editable={!isSendingOtp && !isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                    disabled={isSendingOtp || isLoading}
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
      </ScrollView>

      {/* OTP Modal - Professional Bottom Sheet */}
      <Modal
        visible={isOtpModalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => {
          if (!isVerifyingOtp) {
            resetModal();
          }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={() => !isVerifyingOtp && resetModal()}>
            <View className="flex-1 justify-end bg-black/60">
              <TouchableWithoutFeedback>
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
                    <Text className="text-3xl font-bold text-center text-gray-900 mb-3">
                      Enter OTP
                    </Text>
                    <Text className="text-sm text-center text-gray-600 mb-2">
                      We've sent a 6-digit verification code to
                    </Text>
                    <Text className="text-base font-semibold text-center text-black mb-8">
                      +91 {mobile}
                    </Text>

                    {/* OTP Input */}
                    <View className="mb-8">
                      <TextInput
                        className="bg-gray-50 rounded-2xl px-6 py-5 text-center text-3xl font-bold border-2 border-gray-200 focus:border-black tracking-widest"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
                        placeholder="• • • • • •"
                        placeholderTextColor="#D1D5DB"
                        maxLength={6}
                        editable={!isVerifyingOtp}
                        autoFocus
                        selectTextOnFocus
                      />
                      {otp.length === 6 && (
                        <View className="absolute right-4 top-5">
                          <Text className="text-green-500 text-2xl">✓</Text>
                        </View>
                      )}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                      onPress={handleVerifyOtp}
                      disabled={isVerifyDisabled}
                      className={`rounded-2xl py-5 items-center justify-center mb-4 shadow-lg ${
                        isVerifyDisabled ? 'bg-gray-300' : 'bg-black'
                      }`}
                      activeOpacity={0.8}
                    >
                      {isVerifyingOtp ? (
                        <View className="flex-row items-center">
                          <ActivityIndicator color="#fff" size="small" />
                          <Text className="text-white font-semibold text-base ml-2">
                            Verifying...
                          </Text>
                        </View>
                      ) : (
                        <Text className="text-white font-bold text-base">Verify & Login</Text>
                      )}
                    </TouchableOpacity>

                    {/* Resend OTP */}
                    <View className="items-center py-4">
                      {resendTimer > 0 ? (
                        <Text className="text-sm text-gray-500">
                          Resend OTP in{' '}
                          <Text className="font-semibold text-black">{resendTimer}s</Text>
                        </Text>
                      ) : (
                        <TouchableOpacity
                          onPress={handleResendOtp}
                          disabled={isSendingOtp || isVerifyingOtp}
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
                      onPress={resetModal}
                      disabled={isVerifyingOtp}
                      className="py-4 mt-2"
                    >
                      <Text className="text-center text-gray-400 text-sm font-medium">
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    {/* Bottom Spacing for Keyboard */}
                    <View className="h-4" />
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}