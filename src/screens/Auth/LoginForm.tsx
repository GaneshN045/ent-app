// components/auth/LoginForm.tsx

import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useSendOtpMutation } from '../../services/api/authApi';
import { encryptText } from '../../utils/encryption';
import COLORS from '../../constants/colors';

const COMPANY_LOGO = require('../../assets/logos/im_logo_updated.png');

interface LoginFormProps {
  mobile: string;
  onMobileChange: (mobile: string) => void;
  password: string;
  onPasswordChange: (password: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  isSendingOtp: boolean;
  onOtpSent: (otp: string, role: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

interface LoginFormValues {
  mobile: string;
  password: string;
}

const loginValidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

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
  const [apiError, setApiError] = React.useState<string>('');

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    onLoadingChange(true);
    await new Promise<void>(resolve => setTimeout(() => resolve(), 0));
    Keyboard.dismiss();

    try {
      const encryptedUsernameData = encryptText(values.mobile);
      const encryptedPasswordData = encryptText(values.password);

      const payload = {
        userName: encryptedUsernameData.encrypted,
        password: encryptedPasswordData.encrypted,
        salt: encryptedUsernameData.salt,
        iv: encryptedUsernameData.iv,
        url: 'https://uat.decipay.in/',
      };

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('OTP request timed out after 30 seconds')), 30000)
      );

      const response: any = await Promise.race([
        sendOtpMutation(payload).unwrap(),
        timeoutPromise,
      ]);

      if (!response || response.statusCode !== 200 || !response.data?.otp) {
        const errorMsg = response?.message || 'Failed to send OTP. Please try again.';
        setApiError(errorMsg);
        if (isMountedRef.current) {
          onLoadingChange(false);
          setSubmitting(false);
        }
        return;
      }

      const otpFromServer = String(response.data.otp);
      const roleFromServer = response.data.role || 'EN';

      if (isMountedRef.current) {
        onOtpSent(otpFromServer, roleFromServer);
        onLoadingChange(false);
        setSubmitting(false);
      }
    } catch (error: any) {
      console.log('[LOGINFORM-ERROR]', error);
      if (isMountedRef.current) {
        const errorMessage =
          error?.data?.message || error?.message || 'Unable to send OTP. Please try again.';
        setApiError(errorMessage);
        onLoadingChange(false);
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik<LoginFormValues>
      initialValues={{ mobile, password }}
      enableReinitialize
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange
      validateOnBlur
    >
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit: formikHandleSubmit }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center">
            {/* Logo/Header Section */}
            <View className="items-center mb-12">
              <View style={{ width: 80 }} className="h-24 rounded-2xl bg-white items-center justify-center mb-6 shadow-lg">
                <Image
                  source={COMPANY_LOGO}
                  style={{ width: 60, height: 70 }}
                  resizeMode="contain"
                />
              </View>

              <Text className="text-4xl font-bold text-gray-800 mb-2">
                Welcome Back
              </Text>

              <Text className="text-base text-gray-500">
                Sign in to continue to your account
              </Text>
            </View>

            {/* Login Form */}
            <View className="mb-6">
              {/* Mobile Input */}
              <View className="mb-5">
                <Text className="text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </Text>
                <View className="relative">
                  <TextInput
                    className={`bg-white rounded-2xl px-5 py-4 text-base text-gray-900 border ${
                      touched.mobile && errors.mobile
                        ? 'border-red-500'
                        : values.mobile.length === 10
                        ? 'border-green-500'
                        : 'border-gray-200'
                    }`}
                    keyboardType="phone-pad"
                    value={values.mobile}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, '');
                      handleChange('mobile')(numeric);
                      onMobileChange(numeric);
                      setApiError('');
                    }}
                    onBlur={handleBlur('mobile')}
                    placeholder="Enter 10-digit mobile number"
                    placeholderTextColor="#9CA3AF"
                    maxLength={10}
                    editable={!isSubmitting}
                  />
                </View>
                {touched.mobile && errors.mobile && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">{errors.mobile}</Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-5">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
                <View className="relative">
                  <TextInput
                    className={`bg-white rounded-2xl px-5 py-4 pr-14 text-base text-gray-900 border ${
                      touched.password && errors.password
                        ? 'border-red-500'
                        : values.password.length > 0 && !errors.password
                        ? 'border-green-500'
                        : 'border-gray-200'
                    }`}
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={(text) => {
                      handleChange('password')(text);
                      onPasswordChange(text);
                      setApiError('');
                    }}
                    onBlur={handleBlur('password')}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    editable={!isSubmitting}
                  />
                  <TouchableOpacity
                    onPress={onToggleShowPassword}
                    className="absolute right-4 top-4"
                    disabled={isSubmitting}
                  >
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={24}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password}</Text>
                )}
              </View>

              {/* API Error Message */}
              {apiError && (
                <View className="mb-5 bg-red-50 border border-red-200 rounded-lg p-3">
                  <Text className="text-red-600 text-sm">{apiError}</Text>
                </View>
              )}

              {/* Login Button */}
              <TouchableOpacity
                onPress={() => formikHandleSubmit()}
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className={`mt-6 rounded-2xl py-4 items-center justify-center shadow-lg ${
                  isSubmitting || Object.keys(errors).length > 0
                    ? 'bg-gray-300'
                    : 'bg-white border-primary border'
                }`}
                activeOpacity={0.8}
              >
                {isSubmitting ? (
                  <View className="flex-row items-center">
                    <ActivityIndicator color={COLORS.PRIMARY_COLOR} size="small" />
                    <Text className="text-primary font-semibold text-base ml-2">
                      Sending OTP...
                    </Text>
                  </View>
                ) : (
                  <Text
                    className={`font-bold text-base ${
                      Object.keys(errors).length > 0 ? 'text-white' : 'text-primary'
                    }`}
                  >
                    Continue with OTP
                  </Text>
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
      )}
    </Formik>
  );
}

console.log('[LOGINFORM] Module fully defined');