import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

export default function ManageUserHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage User</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateUserScreen")}
      >
        <Icon name="person-add" size={24} color="#fff" />
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DebitCreditUserScreen")}
      >
        <Icon name="account-balance-wallet" size={24} color="#fff" />
        <Text style={styles.buttonText}>Debit & Credit User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ViewUserScreen")}
      >
        <Icon name="people" size={24} color="#fff" />
        <Text style={styles.buttonText}>View User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

