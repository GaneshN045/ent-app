
// screens/LoginScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { LoginForm } from './LoginForm';
import { OtpModal } from './OtpModal';
import { Role } from '../../navigation/menuConfig';

export default function LoginScreen() {
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

  const handleOtpSent = (otp: string, role: string) => {
    setServerOtp(otp);
    setUserRole(role as Role);
    setIsOtpModalVisible(true);
    setResendTimer(60);
    setIsSendingOtp(false);
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) {
      return;
    }
    // Trigger send OTP from LoginForm by resetting and letting user click again
    // Or you can pass a ref to LoginForm to call handleSendOtp directly
  };

  const resetModal = () => {
    setIsOtpModalVisible(false);
    setOtp('');
    setServerOtp(null);
    setResendTimer(0);
    setIsSendingOtp(false);
  };

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
        <LoginForm
          mobile={mobile}
          onMobileChange={setMobile}
          password={password}
          onPasswordChange={setPassword}
          showPassword={showPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
          isSendingOtp={isSendingOtp}
          onOtpSent={handleOtpSent}
          onLoadingChange={setIsSendingOtp}
        />
      </ScrollView>

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
          <OtpModal
            mobile={mobile}
            otp={otp}
            onOtpChange={setOtp}
            onResendPress={handleResendOtp}
            onCancelPress={resetModal}
            resendTimer={resendTimer}
            isVerifyingOtp={isVerifyingOtp}
            isSendingOtp={isSendingOtp}
            visible={isOtpModalVisible}
          />
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}