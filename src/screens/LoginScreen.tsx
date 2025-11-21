import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginState } = useAuth();

  const onSubmit = async () => {
    try {
      const res = await login({ email, password });
      if (!res?.token) {
        Alert.alert('Login failed', 'Invalid credentials');
      }
    } catch (e: any) {
      Alert.alert('Error', e?.data?.message || e?.message || 'Login error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loginState.isLoading ? 'Logging in...' : 'Login'} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 12, borderRadius: 6 },
  title: { fontSize: 22, marginBottom: 16, textAlign: 'center' },
});
