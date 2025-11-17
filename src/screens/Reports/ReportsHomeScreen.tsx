import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

export default function ReportsHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reports</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CommissionChargesScreen")}
        >
          <Icon name="account-balance-wallet" size={24} color="#fff" />
          <Text style={styles.buttonText}>Commission & Charges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("WalletReportScreen")}
        >
          <Icon name="wallet" size={24} color="#fff" />
          <Text style={styles.buttonText}>Wallet Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NetworkTransactionScreen")}
        >
          <Icon name="swap-horiz" size={24} color="#fff" />
          <Text style={styles.buttonText}>Network Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SearchTransactionScreen")}
        >
          <Icon name="search" size={24} color="#fff" />
          <Text style={styles.buttonText}>Search Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FundLoadingScreen")}
        >
          <Icon name="upload" size={24} color="#fff" />
          <Text style={styles.buttonText}>Fund Loading</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PendingTransactionScreen")}
        >
          <Icon name="pending" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pending Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DebitHistoryScreen")}
        >
          <Icon name="history" size={24} color="#fff" />
          <Text style={styles.buttonText}>Debit History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DownLineBalanceScreen")}
        >
          <Icon name="account-tree" size={24} color="#fff" />
          <Text style={styles.buttonText}>Down Line Balance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
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

