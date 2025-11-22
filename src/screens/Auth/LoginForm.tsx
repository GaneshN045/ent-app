// components/auth/LoginForm.tsx

// Import React
import React, { useRef } from 'react';

// Import RN components
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
} from 'react-native';

// Import API
import { useSendOtpMutation } from '../../services/api/authApi';

// Import encryption
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
    // Let React Native update the button state before running the CPU-intensive encryption.
    await new Promise<void>(resolve => setTimeout(() => resolve(), 0));

    Keyboard.dismiss();

    try {
      const encryptedUsernameData = encryptText(mobile);
      const encryptedPasswordData = encryptText(password);

      const payload = {
        userName: encryptedUsernameData.encrypted,
        password: encryptedPasswordData.encrypted,
        salt: encryptedUsernameData.salt,
        iv: encryptedUsernameData.iv,
        url: 'https://uat.decipay.in/',
      };

      const apiStart = Date.now();

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('OTP request timed out after 30 seconds')), 30000),
      );

      const json: any = await Promise.race([sendOtpMutation(payload).unwrap(), timeoutPromise]);

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
      console.log('[LOGINFORM-ERROR] Error:', e);
      if (isMountedRef.current) {
        const errorMessage =
          e?.data?.message || e?.message || 'Unable to send OTP. Please try again.';
        Alert.alert('Error', errorMessage);
        onLoadingChange(false);
        isLoadingRef.current = false;
      }
    }
  };

  const isLoginDisabled =
    isSendingOtp || !mobile || !password || mobile.length < 10 || password.length < 6;

  console.log('[LOGINFORM-17] Returning JSX');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Logo/Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🔐</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue to your account</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Mobile Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={text => onMobileChange(text.replace(/[^0-9]/g, ''))}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#9CA3AF"
                maxLength={10}
                editable={!isSendingOtp}
              />
              {mobile.length === 10 && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={onPasswordChange}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                editable={!isSendingOtp}
              />
              <TouchableOpacity
                onPress={onToggleShowPassword}
                style={styles.eyeIcon}
                disabled={isSendingOtp}
              >
                <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSendOtp}
            disabled={isLoginDisabled}
            style={[
              styles.loginButton,
              isLoginDisabled ? styles.loginButtonDisabled : styles.loginButtonActive,
            ]}
            activeOpacity={0.8}
          >
            {isSendingOtp ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingText}>Sending OTP...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Continue with OTP</Text>
            )}
          </TouchableOpacity>

          {/* Help Text */}
          <View style={styles.helpTextContainer}>
            <Text style={styles.helpText}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#000',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  passwordInput: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 56,
    fontSize: 16,
    color: '#111827',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  checkmark: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  checkmarkText: {
    color: '#10B981',
    fontSize: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  eyeIconText: {
    color: '#9CA3AF',
    fontSize: 18,
  },
  loginButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonActive: {
    backgroundColor: '#000',
  },
  loginButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpTextContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

console.log('[LOGINFORM-18] Module fully defined');
