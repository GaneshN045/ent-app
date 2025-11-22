import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import COLORS from '../constants/colors';

export interface CredentialItem {
  title: string;
  loginId: string;
  password: string;
}

interface CredentialPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: CredentialItem) => void;
}

const CREDENTIALS: CredentialItem[] = [
  {
    title: 'White Label',
    loginId: '9076460261',
    password: 'WhiteLabel@123',
  },
  {
    title: 'Super Distributor',
    loginId: '9930368633',
    password: 'SuperDistributer@123',
  },
  {
    title: 'Partner',
    loginId: '7021812929',
    password: 'Partner@123',
  },
  {
    title: 'Distributor',
    loginId: '9930889406',
    password: 'Distributer@123',
  },
  {
    title: 'Retailer',
    loginId: '8355847323',
    password: 'Test@111',
  },
];

export function CredentialPickerModal({ visible, onClose, onSelect }: CredentialPickerModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.sheetContainer}>
        <Text style={styles.title}>Quick login credentials</Text>
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {CREDENTIALS.map(item => (
            <TouchableOpacity
              key={item.title}
              style={styles.itemButton}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDetail}>Login ID • {item.loginId}</Text>
              <Text style={styles.itemDetail}>Password • {item.password}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  listContainer: {
    gap: 12,
    paddingBottom: 16,
  },
  itemButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: '#4b5563',
  },
  closeButton: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  closeText: {
    color: COLORS.PRIMARY_COLOR,
    fontWeight: '600',
    fontSize: 14,
  },
});
