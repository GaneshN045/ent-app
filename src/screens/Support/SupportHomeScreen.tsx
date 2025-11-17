import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';

export default function SupportHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Support</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BioMetricDeviceScreen')}
        >
          <Icon name="fingerprint" size={24} color="#fff" />
          <Text style={styles.buttonText}>Bio Metric Device</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TicketingScreen')}
        >
          <Icon name="support-agent" size={24} color="#fff" />
          <Text style={styles.buttonText}>Ticketing System</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ContactUsScreen')}
        >
          <Icon name="contact-mail" size={24} color="#fff" />
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TopUpRequestScreen')}
        >
          <Icon name="add-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Top Up Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TopUpHistoryScreen')}
        >
          <Icon name="history" size={24} color="#fff" />
          <Text style={styles.buttonText}>Top Up History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddMoneyScreen')}
        >
          <Icon name="attach-money" size={24} color="#fff" />
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentRequestScreen')}
        >
          <Icon name="payment" size={24} color="#fff" />
          <Text style={styles.buttonText}>Payment Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentHistoryScreen')}
        >
          <Icon name="history" size={24} color="#fff" />
          <Text style={styles.buttonText}>Payment History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentBanksScreen')}
        >
          <Icon name="account-balance" size={24} color="#fff" />
          <Text style={styles.buttonText}>Payment Banks</Text>
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
