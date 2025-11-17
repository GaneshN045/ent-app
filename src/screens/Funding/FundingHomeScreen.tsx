import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

export default function FundingHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funding</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FundRequestScreen")}
      >
        <Icon name="request-quote" size={24} color="#fff" />
        <Text style={styles.buttonText}>Fund Request</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("WalletToWalletScreen")}
      >
        <Icon name="swap-horiz" size={24} color="#fff" />
        <Text style={styles.buttonText}>Wallet To Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FundTransferScreen")}
      >
        <Icon name="send" size={24} color="#fff" />
        <Text style={styles.buttonText}>Fund Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FundReversalScreen")}
      >
        <Icon name="undo" size={24} color="#fff" />
        <Text style={styles.buttonText}>Fund Reversal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("WalletToBankScreen")}
      >
        <Icon name="account-balance" size={24} color="#fff" />
        <Text style={styles.buttonText}>Move To Bank</Text>
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

