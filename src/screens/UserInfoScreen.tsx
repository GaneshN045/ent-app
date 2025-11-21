import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';

export default function UserInfoScreen() {
  const { data, isLoading, error, refetch } = useUser();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading profile</Text>}
      {data && (
        <>
          <Text style={styles.field}>Name: {data.name}</Text>
          <Text style={styles.field}>Email: {data.email}</Text>
        </>
      )}

      <View style={{ height: 12 }} />
      <Button title="Refresh" onPress={() => refetch()} />
      <View style={{ height: 8 }} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  field: { fontSize: 16, marginBottom: 8 },
});
