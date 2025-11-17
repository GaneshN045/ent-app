# Navigation Setup Guide

## Overview
This navigation setup provides a complete role-based navigation system for your React Native app with:
- **Auth Stack**: Login screen
- **Main Drawer**: Role-based drawer navigation with multiple stacks
- **Role-based Access Control**: Menu items filtered based on user roles

## Roles
- `WL` - White Label
- `SD` - Super Distributor
- `DT` - Distributor
- `PT` - Point
- `EN` - Enterprise
- `RT` - Retailer
- `RA` - Retailer Agent

## Navigation Structure

```
RootNavigator
├── Auth Stack (when not authenticated)
│   └── LoginScreen
└── Main Drawer (when authenticated)
    ├── DashboardHomeScreen
    ├── ManageUserStack
    │   ├── ManageUserHomeScreen
    │   ├── CreateUserScreen
    │   ├── DebitCreditUserScreen
    │   └── ViewUserScreen
    ├── ProductsScreen
    ├── FundingStack
    │   ├── FundingHomeScreen
    │   ├── FundRequestScreen
    │   ├── WalletToWalletScreen
    │   ├── FundTransferScreen
    │   ├── FundReversalScreen
    │   └── WalletToBankScreen
    ├── SettingsStack
    │   ├── SettingsHomeScreen
    │   ├── CreateSubUserScreen
    │   ├── ChangeTPINScreen
    │   ├── MyCertificateScreen
    │   ├── LowBalanceAlertScreen
    │   └── IDCardScreen
    ├── SupportStack
    │   ├── SupportHomeScreen
    │   ├── BioMetricDeviceScreen
    │   ├── TicketingScreen
    │   ├── ContactUsScreen
    │   ├── TopUpRequestScreen
    │   ├── TopUpHistoryScreen
    │   ├── AddMoneyScreen
    │   ├── PaymentRequestScreen
    │   ├── PaymentHistoryScreen
    │   └── PaymentBanksScreen
    └── ReportsStack
        ├── ReportsHomeScreen
        ├── CommissionChargesScreen
        ├── WalletReportScreen
        ├── NetworkTransactionScreen
        ├── SearchTransactionScreen
        ├── FundLoadingScreen
        ├── PendingTransactionScreen
        ├── DebitHistoryScreen
        └── DownLineBalanceScreen
```

## Usage

### Login
The app starts with the Login screen. After successful login, the user role is stored in Redux and the app navigates to the Main Drawer.

### Role-based Menu
The drawer menu is automatically filtered based on the user's role. Only menu items and sub-items that the user has access to are shown.

### Customizing Icons
Icons are defined in `menuConfig.ts` using `react-native-vector-icons/MaterialIcons`. You can change icons by modifying the `icon` property in the menu items.

### Adding New Screens
1. Create the screen component in the appropriate folder under `src/screens/`
2. Add the screen to the appropriate stack navigator
3. Add the screen to the navigation types in `types.ts`
4. Optionally add it to `menuConfig.ts` if it should appear in the drawer menu

## Redux Store
The navigation uses Redux to manage authentication state:
- `state.auth.isAuthenticated` - Controls which navigator to show
- `state.auth.user.role` - Determines which menu items to show

## Icons
The app uses `react-native-vector-icons` with MaterialIcons. Make sure to:
- For iOS: Run `pod install` in the `ios` directory
- For Android: The fonts are automatically linked

