import React, { useState, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { LoginForm } from './LoginForm';
import { OtpModal } from './OtpModal';
import { Role } from '../../navigation/menuConfig';
import { CredentialPickerModal, CredentialItem } from '../../components/CredentialPickerModal';
import COLORS from '../../constants/colors';

const SCREEN_LOAD_TIME = Date.now();
console.log('[PERF] LoginScreen module loaded');

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
  const [isCredentialModalVisible, setIsCredentialModalVisible] = useState(false);

  useEffect(() => {
    console.log('[PERF] LoginScreen rendered in:', Date.now() - SCREEN_LOAD_TIME, 'ms');
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    let interval: any = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
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

  const handleCredentialSelection = (item: CredentialItem) => {
    setMobile(item.loginId);
    setPassword(item.password);
    setIsCredentialModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setIsCredentialModalVisible(true)}
            style={styles.badgeButton}
          >
            <Text style={styles.badgeText}>Quick creds</Text>
          </TouchableOpacity>
        </View>
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
          // if (!isVerifyingOtp) {
          resetModal();
          // }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
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

      <CredentialPickerModal
        visible={isCredentialModalVisible}
        onClose={() => setIsCredentialModalVisible(false)}
        onSelect={handleCredentialSelection}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  modalContainer: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badgeButton: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 24,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
