// screens/Settings/SettingsHomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Correct non-Expo import
import SCREENS from '../../constants/screens';

// Type-safe navigation (no any!)
type SettingsNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function SettingsHomeScreen() {
  const navigation = useNavigation<SettingsNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREENS.CREATE_SUB_USER_SCREEN)}
      >
        <Icon name="person-add" size={26} color="#fff" />
        <Text style={styles.buttonText}>Create Sub User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREENS.CHANGE_TPIN_SCREEN)}
      >
        <Icon name="lock" size={26} color="#fff" />
        <Text style={styles.buttonText}>Change TPIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREENS.MY_CERTIFICATE_SCREEN)}
      >
        <Icon name="verified" size={26} color="#fff" />
        <Text style={styles.buttonText}>My Certificate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREENS.LOW_BALANCE_ALERT_SCREEN)}
      >
        <Icon name="notifications-active" size={26} color="#fff" />
        <Text style={styles.buttonText}>Low Balance Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(SCREENS.ID_CARD_SCREEN)}
      >
        <Icon name="badge" size={26} color="#fff" />
        <Text style={styles.buttonText}>ID Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    flex: 1,
  },
});