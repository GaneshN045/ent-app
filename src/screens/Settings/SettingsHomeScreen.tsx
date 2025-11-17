import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

export default function SettingsHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateSubUserScreen")}
      >
        <Icon name="person-add" size={24} color="#fff" />
        <Text style={styles.buttonText}>Create Sub User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChangeTPINScreen")}
      >
        <Icon name="lock" size={24} color="#fff" />
        <Text style={styles.buttonText}>Change TPIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MyCertificateScreen")}
      >
        <Icon name="verified" size={24} color="#fff" />
        <Text style={styles.buttonText}>My Certificate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LowBalanceAlertScreen")}
      >
        <Icon name="notifications" size={24} color="#fff" />
        <Text style={styles.buttonText}>Low Balance Alert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("IDCardScreen")}
      >
        <Icon name="badge" size={24} color="#fff" />
        <Text style={styles.buttonText}>ID Card</Text>
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

