// screens/Reports/ReportsHomeScreen.tsx

import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Correct import (non-Expo)
import SCREENS from '../../constants/screens';
import { useAppSelector } from '../../store/hooks';
import { Role, canAccess, allMenuItems } from '../../navigation/menuConfig';

// Type-safe navigation prop (no `any`)
type ReportsNavigationProp = {
  navigate: (screen: keyof typeof SCREENS) => void;
};

export default function ReportsHomeScreen() {
  const navigation = useNavigation<ReportsNavigationProp>();
  const userRole = (useAppSelector(state => state.auth.user?.role) || 'RT') as Role;

  const reportsMenu = allMenuItems.find(item => item.screen === 'ReportsStack');

  const items = (reportsMenu?.subItems || [])
    .filter(sub => canAccess(sub.roles, userRole))
    .map(sub => ({
      key: sub.screen,
      title: sub.name,
      icon:
        sub.screen === SCREENS.COMMISSION_CHARGES_SCREEN
          ? 'account-balance-wallet'
          : sub.screen === SCREENS.WALLET_REPORT_SCREEN
            ? 'wallet'
            : sub.screen === SCREENS.NETWORK_TRANSACTION_SCREEN
              ? 'swap-horiz'
              : sub.screen === SCREENS.SEARCH_TRANSACTION_SCREEN
                ? 'search'
                : sub.screen === SCREENS.FUND_LOADING_SCREEN
                  ? 'upload'
                  : sub.screen === SCREENS.PENDING_TRANSACTION_SCREEN
                    ? 'pending-actions'
                    : sub.screen === SCREENS.DEBIT_HISTORY_SCREEN
                      ? 'history'
                      : sub.screen === SCREENS.DOWNLINE_BALANCE_SCREEN
                        ? 'account-tree'
                        : 'insert-chart',
      screen: sub.screen as keyof typeof SCREENS,
    }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reports</Text>

        {items.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.button}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={26} color="#fff" />
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
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
