// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------
export type Role =
  | "WL"
  | "SD"
  | "DT"
  | "PT"
  | "EN"
  | "RT"
  | "RA";

export interface MenuItem {
  name: string;
  screen: string; // React Navigation screen name
  icon?: string; // Icon name from @react-native-vector-icons/material-icons
  roles?: Role[];
  subItems?: MenuItem[];
}

// ---------------------------------------------------------
// ROLE ORDER (Inheritance)
// ---------------------------------------------------------
export const ROLE_HIERARCHY: Role[] = [
  "WL",
  "SD",
  "DT",
  "PT",
  "EN",
  "RT",
  "RA",
];

// ---------------------------------------------------------
// ACCESS FUNCTION
// ---------------------------------------------------------
export const canAccess = (
  allowed: Role[] | undefined,
  role: Role
): boolean => {
  if (!allowed || allowed.length === 0) return true;
  return allowed.includes(role);
};

// ---------------------------------------------------------
// MAIN MENU CONFIG (Drawer Menu)
// React Navigation compatible
// ---------------------------------------------------------
export const allMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    screen: "DashboardHomeScreen",
    icon: "dashboard",
    roles: ROLE_HIERARCHY,
  },
  // ---------------- Manage User ----------------
  {
    name: "Manage User",
    screen: "ManageUserStack",
    icon: "people",
    roles: ["DT", "SD", "WL", "PT"],
    subItems: [
      {
        name: "Create User",
        screen: "CreateUserScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Debit & Credit User",
        screen: "DebitCreditUserScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "View User",
        screen: "ViewUserScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
    ],
  },
  // ---------------- Products ----------------
  {
    name: "Products",
    screen: "ProductsScreen",
    icon: "inventory",
    roles: ["RT", "RA"],
  },
  // ---------------- Funding ----------------
  {
    name: "Funding",
    screen: "FundingStack",
    icon: "account-balance-wallet",
    roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
    subItems: [
      {
        name: "Fund Request",
        screen: "FundRequestScreen",
        roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Wallet To Wallet",
        screen: "WalletToWalletScreen",
        roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Fund Transfer",
        screen: "FundTransferScreen",
        roles: ["DT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Fund Reversal",
        screen: "FundReversalScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Move To Bank",
        screen: "WalletToBankScreen",
        roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
      },
    ],
  },
  // ---------------- Settings ----------------
  {
    name: "Settings",
    screen: "SettingsStack",
    icon: "settings",
    roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
    subItems: [
      {
        name: "Create Sub User",
        screen: "CreateSubUserScreen",
        roles: ["RT"],
      },
      {
        name: "Change TPIN",
        screen: "ChangeTPINScreen",
        roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "My Certificate",
        screen: "MyCertificateScreen",
        roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Low Balance Alert",
        screen: "LowBalanceAlertScreen",
        roles: ["RT", "RA"],
      },
      {
        name: "ID Card",
        screen: "IDCardScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
    ],
  },
  // ---------------- Support ----------------
  {
    name: "Support",
    screen: "SupportStack",
    icon: "support-agent",
    roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
    subItems: [
      {
        name: "Bio Metric Device",
        screen: "BioMetricDeviceScreen",
        roles: ["RT", "RA"],
      },
      {
        name: "Ticketing System",
        screen: "TicketingScreen",
        roles: ["RT", "DT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Contact Us",
        screen: "ContactUsScreen",
        roles: ["RT", "SD", "WL", "RA"],
      },
      {
        name: "Top Up Request",
        screen: "TopUpRequestScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Top Up History",
        screen: "TopUpHistoryScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Add Money",
        screen: "AddMoneyScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Payment Request",
        screen: "PaymentRequestScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Payment History",
        screen: "PaymentHistoryScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Payment Banks",
        screen: "PaymentBanksScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
    ],
  },
  // ---------------- Reports ----------------
  {
    name: "Reports",
    screen: "ReportsStack",
    icon: "assessment",
    roles: ["DT", "RT", "SD", "WL", "PT", "RA"],
    subItems: [
      {
        name: "Commission & Charges",
        screen: "CommissionChargesScreen",
        roles: ["DT", "RT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Wallet Report",
        screen: "WalletReportScreen",
        roles: ["DT", "RT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Network Transaction",
        screen: "NetworkTransactionScreen",
        roles: ["DT", "RT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Search Transaction",
        screen: "SearchTransactionScreen",
        roles: ["DT", "RT", "SD", "WL", "PT", "RA"],
      },
      {
        name: "Fund Loading",
        screen: "FundLoadingScreen",
        roles: ["RT", "RA"],
      },
      {
        name: "Pending Transaction",
        screen: "PendingTransactionScreen",
        roles: ["RT", "RA"],
      },
      {
        name: "Debit History",
        screen: "DebitHistoryScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
      {
        name: "Down Line Balance",
        screen: "DownLineBalanceScreen",
        roles: ["DT", "SD", "WL", "PT"],
      },
    ],
  },
];

// ---------------------------------------------------------
//  FILTERED MENU BASED ON ROLE
// ---------------------------------------------------------
export const getMenuForRole = (role: Role): MenuItem[] => {
  return allMenuItems
    .filter((item) => canAccess(item.roles, role))
    .map((item) => {
      if (!item.subItems) return item;
      const sub = item.subItems.filter((sub) => canAccess(sub.roles, role));
      if (sub.length === 0) return null;
      return { ...item, subItems: sub };
    })
    .filter(Boolean) as MenuItem[];
};

