import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentBanksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Banks</Text>
      <Text style={styles.subtitle}>Payment banks list will go here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
