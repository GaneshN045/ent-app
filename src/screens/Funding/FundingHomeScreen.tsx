// screens/Funding/FundingHomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SCREENS from '../../constants/screens';

// Type-safe navigation
type FundingNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function FundingHomeScreen() {
  const navigation = useNavigation<FundingNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Funding</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.FUND_REQUEST_SCREEN)}
        >
          <Icon name="request-quote" size={26} color="#fff" />
          <Text style={styles.buttonText}>Fund Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.WALLET_TO_WALLET_SCREEN)}
        >
          <Icon name="swap-horiz" size={26} color="#fff" />
          <Text style={styles.buttonText}>Wallet To Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.FUND_TRANSFER_SCREEN)}
        >
          <Icon name="send" size={26} color="#fff" />
          <Text style={styles.buttonText}>Fund Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.FUND_REVERSAL_SCREEN)}
        >
          <Icon name="history-toggle-off" size={26} color="#fff" />
          <Text style={styles.buttonText}>Fund Reversal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(SCREENS.WALLET_TO_BANK_SCREEN)}
        >
          <Icon name="account-balance" size={26} color="#fff" />
          <Text style={styles.buttonText}>Move To Bank</Text>
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