import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';
import { useAppSelector } from '../../store/hooks';
import { Role, canAccess, allMenuItems } from '../../navigation/menuConfig';

export default function ManageUserHomeScreen() {
  const navigation = useNavigation<any>();

  const userRole = (useAppSelector(state => state.auth.user?.role) || 'RT') as Role;

  const manageUserMenu = allMenuItems.find(item => item.screen === 'ManageUserStack');

  const items = (manageUserMenu?.subItems || [])
    .filter(sub => canAccess(sub.roles, userRole))
    .map(sub => ({
      key: sub.screen,
      title: sub.name,
      icon:
        sub.screen === 'CreateUserScreen'
          ? 'person-add'
          : sub.screen === 'DebitCreditUserScreen'
            ? 'account-balance-wallet'
            : sub.screen === 'ViewUserScreen'
              ? 'people'
              : 'person',
      screen: sub.screen,
    }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage User</Text>
      {items.map(item => (
        <TouchableOpacity
          key={item.key}
          style={styles.button}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Icon name={item.icon as any} size={24} color="#fff" />
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
