// screens/Reports/ReportsHomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Correct import (non-Expo)
import SCREENS from '../../constants/screens';

// Type-safe navigation prop (no `any`)
type ReportsNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function ReportsHomeScreen() {
  const navigation = useNavigation<ReportsNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reports</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.COMMISSION_CHARGES_SCREEN)}
        >
          <Icon name="account-balance-wallet" size={26} color="#fff" />
          <Text style={styles.buttonText}>Commission & Charges</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.WALLET_REPORT_SCREEN)}
        >
          <Icon name="wallet" size={26} color="#fff" />
          <Text style={styles.buttonText}>Wallet Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.NETWORK_TRANSACTION_SCREEN)}
        >
          <Icon name="swap-horiz" size={26} color="#fff" />
          <Text style={styles.buttonText}>Network Transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.SEARCH_TRANSACTION_SCREEN)}
        >
          <Icon name="search" size={26} color="#fff" />
          <Text style={styles.buttonText}>Search Transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.FUND_LOADING_SCREEN)}
        >
          <Icon name="upload" size={26} color="#fff" />
          <Text style={styles.buttonText}>Fund Loading</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.PENDING_TRANSACTION_SCREEN)}
        >
          <Icon name="pending-actions" size={26} color="#fff" />
          <Text style={styles.buttonText}>Pending Transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.DEBIT_HISTORY_SCREEN)}
        >
          <Icon name="history" size={26} color="#fff" />
          <Text style={styles.buttonText}>Debit History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.DOWNLINE_BALANCE_SCREEN)}
        >
          <Icon name="account-tree" size={26} color="#fff" />
          <Text style={styles.buttonText}>Down Line Balance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 28,
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