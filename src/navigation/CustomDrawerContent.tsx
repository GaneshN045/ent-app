import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";
import { MenuItem } from "./menuConfig";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainDrawerParamList } from "./types";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

type NavigationProp = NativeStackNavigationProp<MainDrawerParamList>;

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  menuItems: MenuItem[];
}

export default function CustomDrawerContent({
  menuItems,
  ...props
}: CustomDrawerContentProps) {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const handleMenuPress = (item: MenuItem) => {
    if (item.subItems && item.subItems.length > 0) {
      // Navigate to the stack's home screen
      navigation.navigate(item.screen as keyof MainDrawerParamList);
    } else {
      navigation.navigate(item.screen as keyof MainDrawerParamList);
    }
    props.navigation.closeDrawer();
  };

  const handleSubItemPress = (subItem: MenuItem, parentScreen: string) => {
    // Navigate to parent stack first, then to the specific screen
    navigation.navigate(parentScreen as keyof MainDrawerParamList, {
      screen: subItem.screen as any,
    } as any);
    props.navigation.closeDrawer();
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isActive = props.state.routes.some(
      (route) => route.name === item.screen
    );

    return (
      <View key={item.screen}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            level > 0 && styles.subMenuItem,
            isActive && styles.activeMenuItem,
          ]}
          onPress={() => handleMenuPress(item)}
        >
          <View style={styles.menuItemContent}>
            {item.icon && (
              <View style={styles.iconContainer}>
                <Icon 
                  name={item.icon} 
                  size={24} 
                  color={isActive ? "#2196f3" : "#000"} 
                />
              </View>
            )}
            <Text
              style={[
                styles.menuItemText,
                level > 0 && styles.subMenuItemText,
                isActive && styles.activeMenuItemText,
              ]}
            >
              {item.name}
            </Text>
          </View>
          {item.subItems && item.subItems.length > 0 && (
            <Icon name="chevron-right" size={20} color="#666" />
          )}
        </TouchableOpacity>

        {/* Render sub-items */}
        {item.subItems && item.subItems.length > 0 && (
          <View style={styles.subMenuContainer}>
            {item.subItems.map((subItem) => (
              <TouchableOpacity
                key={subItem.screen}
                style={[styles.menuItem, styles.subMenuItem]}
                onPress={() => handleSubItemPress(subItem, item.screen)}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.subItemIndicator} />
                  <Text style={[styles.menuItemText, styles.subMenuItemText]}>
                    {subItem.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => renderMenuItem(item))}
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            props.navigation.closeDrawer();
            dispatch(logout());
          }}
        >
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  menuContainer: {
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
  subMenuItem: {
    paddingLeft: 50,
  },
  activeMenuItem: {
    backgroundColor: "#e3f2fd",
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
  },
  subMenuItemText: {
    fontSize: 14,
    color: "#666",
  },
  activeMenuItemText: {
    color: "#2196f3",
    fontWeight: "600",
  },
  subMenuContainer: {
    backgroundColor: "#f5f5f5",
  },
  subItemIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#999",
    marginRight: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f44336",
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

