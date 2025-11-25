import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type SuccessPopupProps = {
  visible: boolean;
  title?: string;
  message: string;
  primaryLabel?: string;
  onPrimaryPress?: () => void;
  onRequestClose: () => void;
};

export function SuccessPopup({
  visible,
  title = 'Success',
  message,
  primaryLabel = 'OK',
  onPrimaryPress,
  onRequestClose,
}: SuccessPopupProps) {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.55)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 380,
            borderRadius: 30,
            backgroundColor: '#fff',
            paddingVertical: 32,
            paddingHorizontal: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 25,
            elevation: 25,
            position: 'relative',
          }}
        >
          {/* Close Icon */}
          <TouchableOpacity
            onPress={onRequestClose}
            activeOpacity={0.7}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              padding: 6,
            }}
          >
            <MaterialIcons name="close" size={26} color="#777" />
          </TouchableOpacity>

          {/* Success Icon */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <MaterialIcons name="verified" size={66} color="#4CAF50" />
          </View>

          {/* Title */}
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              fontWeight: '700',
              color: '#222',
              marginBottom: 8,
            }}
          >
            {title}
          </Text>

          {/* Message */}
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#555',
              marginBottom: 32,
              lineHeight: 22,
            }}
          >
            {message}
          </Text>

          {/* Primary Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              onPrimaryPress?.();
              onRequestClose();
            }}
            className="border-2  border-primary mt-12 "
            style={{
              backgroundColor: 'white',
              borderRadius: 18,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.PRIMARY_COLOR,
                fontSize: 17,
                fontWeight: '600',
              }}
            >
              {primaryLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
