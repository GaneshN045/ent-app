import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MenuItem } from '../navigation/menuConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { storage } from '../utils/storage';
import { useAppSelector } from '../store/hooks';
import { useGetWalletBalanceQuery } from '../services/api/profileApi';
import { useUserId } from '../hooks/useUserId';
import { useUserRole } from '../hooks/useUserRole';

// Colors
const COLORS = {
  PRIMARY: '#EB4335',
  PRIMARY_GRAY: '#3A3A42',
  SECONDARY_GRAY: '#9A9AA3',
  GRAY_ICON: '#6E6E76',
};

const PROFILE_IMAGE_PLACEHOLDER = 'https://via.placeholder.com/80';

type CustomDrawerProps = DrawerContentComponentProps & {
  menuItems: MenuItem[];
};

export default function CustomDrawerContent({ navigation, menuItems }: CustomDrawerProps) {
  const menu: MenuItem[] = menuItems;
  const [logoutLoading, setLogoutLoading] = useState(false);

  const user = useAppSelector(state => state.auth.user);
  const { userId: persistedUserId, loading: userIdLoading } = useUserId();

  const memberId = persistedUserId;
  const shouldFetchWallet = Boolean(memberId);
  const { data: walletResponse, isFetching: walletFetching } = useGetWalletBalanceQuery(
    memberId ?? '',
    {
      skip: !shouldFetchWallet,
    },
  );
  const walletData = walletResponse?.data;

  const formatCurrency = (value?: number) =>
    value == null
      ? '—'
      : `₹${value.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  const prepaidBalanceLabel = walletFetching
    ? 'Loading...'
    : formatCurrency(walletData?.prepaidBalance);
  const postpaidBalanceLabel = walletFetching
    ? 'Loading...'
    : formatCurrency(walletData?.postpaidBalance);

  const dispatch = useDispatch();

  // Filter only Settings, Support, and Reports
  const userRole = useUserRole();
  const filteredMenu = menu.filter(item => {
    if (item.name === 'Manage User') {
      return item.roles?.includes(userRole ?? 'RT');
    }
    return ['Reports', 'Support', 'Manage User'].includes(item.name);
  });

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpanded(prev => (prev === name ? null : name));
  };

  const handleLogout = async () => {
    console.log('Logout pressed');
    setLogoutLoading(true);

    dispatch(logout());
    navigation.closeDrawer();

    try {
      await storage.clearToken();
      await AsyncStorage.multiRemove(['userRole', 'userId']);
    } catch (e) {
      console.log('Logout error:', e);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: PROFILE_IMAGE_PLACEHOLDER }} style={styles.profileImage} />
          </View>
          <Text style={styles.userName}>{user?.name ?? 'John Doe'}</Text>
          <Text style={styles.memberId}>{user?.id ?? memberId}</Text>

          <View style={styles.balanceContainer}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Prepaid</Text>
              <Text style={styles.balanceAmount}>{prepaidBalanceLabel}</Text>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Postpaid</Text>
              <Text style={styles.balanceAmount}>{postpaidBalanceLabel}</Text>
            </View>
          </View>
        </View>

        {filteredMenu.map((item: MenuItem, index: number) => (
          <View key={index} style={styles.menuItemWrapper}>
            {/* Main Menu Button */}
            <TouchableOpacity
              style={[styles.menuItem, expanded === item.name && styles.menuItemExpanded]}
              onPress={() => {
                if (item.subItems && item.subItems.length > 0) {
                  toggleExpand(item.name);
                } else {
                  // For items without sub-items, navigate directly
                  navigation.navigate(item.screen);
                }
              }}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                {item.icon && (
                  <View style={styles.iconContainer}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color={expanded === item.name ? COLORS.PRIMARY : COLORS.GRAY_ICON}
                    />
                  </View>
                )}
                <Text style={[styles.menuText, expanded === item.name && styles.menuTextExpanded]}>
                  {item.name}
                </Text>
              </View>

              {item.subItems && (
                <Icon
                  name={expanded === item.name ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={22}
                  color={expanded === item.name ? COLORS.PRIMARY : COLORS.SECONDARY_GRAY}
                />
              )}
            </TouchableOpacity>

            {/* Sub Menu with Animation */}
            {expanded === item.name && item.subItems && (
              <View style={styles.subMenuContainer}>
                {item.subItems.map((sub, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    style={styles.subMenuItem}
                    onPress={() => {
                      console.log('---- Drawer Navigation Triggered ----');
                      console.log('Parent:', item.screen);
                      console.log('Target:', sub.screen);

                      // Close drawer first
                      navigation.closeDrawer();

                      // Navigate to stack with both SupportHomeScreen and target screen
                      // This creates a proper back stack: Dashboard -> SupportHomeScreen -> TargetScreen
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [
                            {
                              name: item.screen, // e.g., "SupportStack"
                              state: {
                                index: 1, // We want the second screen to be active
                                routes: [
                                  { name: 'SUPPORT_HOME_SCREEN' }, // First screen in stack
                                  { name: sub.screen }, // Target screen (active)
                                ],
                              },
                            },
                          ],
                        }),
                      );
                    }}
                    activeOpacity={0.6}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <View style={styles.subMenuDot} />
                      <Text style={styles.subMenuText}>{sub.name}</Text>
                    </View>
                    <View>
                      <Icon name="keyboard-arrow-right" size={22} color="gray" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          {logoutLoading ? (
            <ActivityIndicator size={'small'} color={COLORS.PRIMARY}></ActivityIndicator>
          ) : (
            <>
              <Icon name="logout" size={20} color={COLORS.PRIMARY} />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  profileSection: {
    backgroundColor: '#fff',
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    color: COLORS.PRIMARY_GRAY,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  memberId: {
    color: COLORS.SECONDARY_GRAY,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  balanceLabel: {
    color: COLORS.SECONDARY_GRAY,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    color: COLORS.PRIMARY_GRAY,
    fontSize: 15,
    fontWeight: '700',
  },
  scrollView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemWrapper: {
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  menuItemExpanded: {
    backgroundColor: '#fff',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 14,
  },
  menuText: {
    fontSize: 15.5,
    fontWeight: '600',
    color: COLORS.PRIMARY_GRAY,
    letterSpacing: 0.2,
  },
  menuTextExpanded: {
    color: COLORS.PRIMARY_GRAY,
  },
  subMenuContainer: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 6,
    paddingLeft: 54,
    paddingRight: 20,
    marginLeft: 2,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  subMenuDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.GRAY_ICON,
    marginRight: 14,
  },
  subMenuText: {
    fontSize: 14.5,
    color: COLORS.PRIMARY_GRAY,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    gap: 8,
  },
  logoutText: {
    color: COLORS.PRIMARY,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
