import { NavigatorScreenParams } from '@react-navigation/native';

// Root Navigation Types
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainDrawerParamList>;
};

// Auth Stack Types
export type AuthStackParamList = {
  LoginScreen: undefined;
};

// Main Drawer Types
export type MainDrawerParamList = {
  DashboardHomeScreen: undefined;
  ManageUserStack: NavigatorScreenParams<ManageUserStackParamList>;
  ProductsScreen: undefined;
  FundingStack: NavigatorScreenParams<FundingStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
  SupportStack: NavigatorScreenParams<SupportStackParamList>;
  ReportsStack: NavigatorScreenParams<ReportsStackParamList>;
};

// Manage User Stack Types
export type ManageUserStackParamList = {
  ManageUserHomeScreen: undefined;
  CreateUserScreen: undefined;
  DebitCreditUserScreen: undefined;
  ViewUserScreen: undefined;
};

// Funding Stack Types
export type FundingStackParamList = {
  FundingHomeScreen: undefined;
  FundRequestScreen: undefined;
  WalletToWalletScreen: undefined;
  FundTransferScreen: undefined;
  FundReversalScreen: undefined;
  WalletToBankScreen: undefined;
};

// Settings Stack Types
export type SettingsStackParamList = {
  SettingsHomeScreen: undefined;
  CreateSubUserScreen: undefined;
  ChangeTPINScreen: undefined;
  MyCertificateScreen: undefined;
  LowBalanceAlertScreen: undefined;
  IDCardScreen: undefined;
};

// Support Stack Types
export type SupportStackParamList = {
  SupportHomeScreen: undefined;
  BioMetricDeviceScreen: undefined;
  TicketingScreen: undefined;
  ContactUsScreen: undefined;
  TopUpRequestScreen: undefined;
  TopUpHistoryScreen: undefined;
  AddMoneyScreen: undefined;
  PaymentRequestScreen: undefined;
  PaymentHistoryScreen: undefined;
  PaymentBanksScreen: undefined;
};

// Reports Stack Types
export type ReportsStackParamList = {
  ReportsHomeScreen: undefined;
  CommissionChargesScreen: undefined;
  WalletReportScreen: undefined;
  NetworkTransactionScreen: undefined;
  SearchTransactionScreen: undefined;
  FundLoadingScreen: undefined;
  PendingTransactionScreen: undefined;
  DebitHistoryScreen: undefined;
  DownLineBalanceScreen: undefined;
};

// Declare global types for React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
