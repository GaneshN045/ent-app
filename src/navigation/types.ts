import { NavigatorScreenParams } from '@react-navigation/native';
import SCREENS from '../constants/screens';

// Root Navigation Types
export type RootStackParamList = {
  [SCREENS.ROOT_AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [SCREENS.ROOT_MAIN]: NavigatorScreenParams<MainDrawerParamList>;
};

// Auth Stack Types
export type AuthStackParamList = {
  [SCREENS.LOGIN_SCREEN]: undefined;
};

// Common Stack Types (notifications)
export type CommonStackParamList = {
  [SCREENS.NOTIFICATIONS_SCREEN]: undefined;
};

// Main Drawer Types (matches MainDrawer.tsx)
export type MainDrawerParamList = {
  [SCREENS.BOTTOM_STACK]: undefined; // BottomTabs navigator
  [SCREENS.SUPPORT_STACK]: NavigatorScreenParams<SupportStackParamList>;
  [SCREENS.REPORTS_STACK]: NavigatorScreenParams<ReportsStackParamList>;
  [SCREENS.COMMON_STACK]: NavigatorScreenParams<CommonStackParamList>;
};

// Manage User Stack Types
export type ManageUserStackParamList = {
  [SCREENS.MANAGE_USER_HOME_SCREEN]: undefined;
  [SCREENS.CREATE_USER_SCREEN]: undefined;
  [SCREENS.DEBIT_CREDIT_USER_SCREEN]: undefined;
  [SCREENS.VIEW_USER_SCREEN]: undefined;
};

// Funding Stack Types
export type FundingStackParamList = {
  [SCREENS.FUNDING_HOME_SCREEN]: undefined;
  [SCREENS.FUND_REQUEST_SCREEN]: undefined;
  [SCREENS.WALLET_TO_WALLET_SCREEN]: undefined;
  [SCREENS.FUND_TRANSFER_SCREEN]: undefined;
  [SCREENS.FUND_REVERSAL_SCREEN]: undefined;
  [SCREENS.WALLET_TO_BANK_SCREEN]: undefined;
};

// Settings Stack Types
export type SettingsStackParamList = {
  [SCREENS.SETTINGS_HOME_SCREEN]: undefined;
  [SCREENS.CREATE_SUB_USER_SCREEN]: undefined;
  [SCREENS.CHANGE_TPIN_SCREEN]: undefined;
  [SCREENS.MY_CERTIFICATE_SCREEN]: undefined;
  [SCREENS.LOW_BALANCE_ALERT_SCREEN]: undefined;
  [SCREENS.ID_CARD_SCREEN]: undefined;
};

// Support Stack Types
export type SupportStackParamList = {
  [SCREENS.SUPPORT_HOME_SCREEN]: undefined;
  [SCREENS.BIOMETRIC_DEVICE_SCREEN]: undefined;
  [SCREENS.TICKETING_SCREEN]: undefined;
  [SCREENS.CONTACT_US_SCREEN]: undefined;
  [SCREENS.TOP_UP_REQUEST_SCREEN]: undefined;
  [SCREENS.TOP_UP_HISTORY_SCREEN]: undefined;
  [SCREENS.ADD_MONEY_SCREEN]: undefined;
  [SCREENS.PAYMENT_REQUEST_SCREEN]: undefined;
  [SCREENS.PAYMENT_HISTORY_SCREEN]: undefined;
  [SCREENS.PAYMENT_BANKS_SCREEN]: undefined;
};

// Reports Stack Types
export type ReportsStackParamList = {
  [SCREENS.REPORTS_HOME_SCREEN]: undefined;
  [SCREENS.COMMISSION_CHARGES_SCREEN]: undefined;
  [SCREENS.WALLET_REPORT_SCREEN]: undefined;
  [SCREENS.NETWORK_TRANSACTION_SCREEN]: undefined;
  [SCREENS.SEARCH_TRANSACTION_SCREEN]: undefined;
  [SCREENS.FUND_LOADING_SCREEN]: undefined;
  [SCREENS.PENDING_TRANSACTION_SCREEN]: undefined;
  [SCREENS.DEBIT_HISTORY_SCREEN]: undefined;
  [SCREENS.DOWNLINE_BALANCE_SCREEN]: undefined;
};

// Declare global types for React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
