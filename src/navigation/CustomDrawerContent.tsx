import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { MenuItem, getMenuForRole, Role } from "../navigation/menuConfig";

const USER_ROLE: Role = "RT";

export default function CustomDrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const menu: MenuItem[] = getMenuForRole(USER_ROLE);

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My App Menu</Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={styles.scrollView}>
        {menu.map((item: MenuItem, index: number) => (
          <View key={index}>
            {/* Main Menu */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                if (item.subItems && item.subItems.length > 0) {
                  toggleExpand(item.name);
                } else {
                  navigation.navigate("Main", {
                    screen: "BottomTabs",
                    params: {
                      screen: item.screen,
                    },
                  });
                }
              }}
            >
              <View style={styles.menuLeft}>
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size={22}
                    color="#333"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text style={styles.menuText}>{item.name}</Text>
              </View>

              {item.subItems && (
                <Icon
                  name={
                    expanded === item.name
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={20}
                  color="#555"
                />
              )}
            </TouchableOpacity>

            {/* Sub Menu */}
            {expanded === item.name &&
              item.subItems?.map((sub, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  style={styles.subMenuItem}
                  onPress={() => {
                    console.log("---- Drawer Navigation Triggered ----");
                    console.log("Parent Stack:", "Main");
                    console.log("Drawer Target:", "BottomTabs");
                    console.log("Stack:", item.screen);
                    console.log("Sub Screen:", sub.screen);

                    navigation.navigate("Main", {
                      screen: "BottomTabs",
                      params: {
                        screen: item.screen, // ex: FundingStack
                        params: {
                          screen: sub.screen, // ex: FUND_REQUEST_SCREEN
                        },
                      },
                    });
                  }}
                >
                  <Text style={styles.subMenuText}>• {sub.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, backgroundColor: "#1976D2" },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  scrollView: { paddingVertical: 10 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuText: { fontSize: 16, fontWeight: "500", color: "#222" },
  subMenuItem: { paddingLeft: 55, paddingVertical: 8 },
  subMenuText: { fontSize: 14, color: "#444" },
});
