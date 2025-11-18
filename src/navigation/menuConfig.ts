import SCREENS from "../constants/screens";

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------
export type Role = 'WL' | 'SD' | 'DT' | 'PT' | 'EN' | 'RT' | 'RA';

export interface MenuItem {
  name: string;
  screen: string;  // parent stack name OR dashboard screen
  icon?: string;
  roles?: Role[];
  subItems?: {
    name: string;
    screen: string; // must be SCREENS.* value
    roles?: Role[];
  }[];
}

// ---------------------------------------------------------
// ROLE ORDER
// ---------------------------------------------------------
export const ROLE_HIERARCHY: Role[] = ['WL', 'SD', 'DT', 'PT', 'EN', 'RT', 'RA'];

// ---------------------------------------------------------
// ACCESS FUNCTION
// ---------------------------------------------------------
export const canAccess = (allowed: Role[] | undefined, role: Role) => {
  if (!allowed || allowed.length === 0) return true;
  return allowed.includes(role);
};

// ---------------------------------------------------------
// MAIN MENU CONFIG
// ---------------------------------------------------------
export const allMenuItems: MenuItem[] = [
  // ---------------- Dashboard ----------------
  {
    name: 'Dashboard',
    screen: 'DashboardStack', // correct
    icon: 'dashboard',
    roles: ROLE_HIERARCHY,
  },

  // ---------------- Manage User ----------------
  {
    name: 'Manage User',
    screen: 'ManageUserStack',
    icon: 'people',
    roles: ['DT', 'SD', 'WL', 'PT'],
    subItems: [
      { name: 'Create User', screen: 'CreateUserScreen' },
      { name: 'Debit & Credit User', screen: 'DebitCreditUserScreen' },
      { name: 'View User', screen: 'ViewUserScreen' },
    ],
  },

  // ---------------- Products ----------------
  {
    name: 'Products',
    screen: 'ProductsStack',
    icon: 'inventory',
    roles: ['RT', 'RA'],
  },

  // ---------------- Funding ----------------
  {
    name: 'Funding',
    screen: 'FundingStack',
    icon: 'account-balance-wallet',
    roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      { name: 'Fund Request', screen: SCREENS.FUND_REQUEST_SCREEN },
      { name: 'Wallet To Wallet', screen: SCREENS.WALLET_TO_WALLET_SCREEN },
      { name: 'Fund Transfer', screen: SCREENS.FUND_TRANSFER_SCREEN },
      { name: 'Fund Reversal', screen: SCREENS.FUND_REVERSAL_SCREEN },
      { name: 'Move To Bank', screen: SCREENS.WALLET_TO_BANK_SCREEN },
    ],
  },

 // ---------------- Reports ----------------
 {
  name: 'Reports',
  screen: 'ReportsStack',
  icon: 'assessment',
  roles: ['DT', 'RT', 'SD', 'WL', 'PT', 'RA'],
  subItems: [
    { name: 'Commission & Charges', screen: SCREENS.COMMISSION_CHARGES_SCREEN },
    { name: 'Wallet Report', screen: SCREENS.WALLET_REPORT_SCREEN },
    { name: 'Network Transaction', screen: SCREENS.NETWORK_TRANSACTION_SCREEN },
    { name: 'Search Transaction', screen: SCREENS.SEARCH_TRANSACTION_SCREEN },
    { name: 'Fund Loading', screen: SCREENS.FUND_LOADING_SCREEN },
    { name: 'Pending Transaction', screen: SCREENS.PENDING_TRANSACTION_SCREEN },
    { name: 'Debit History', screen: SCREENS.DEBIT_HISTORY_SCREEN },
    { name: 'Down Line Balance', screen: SCREENS.DOWNLINE_BALANCE_SCREEN },
  ],
},

  // ---------------- Settings ----------------
  {
    name: 'Settings',
    screen: 'SettingsStack',
    icon: 'settings',
    roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      { name: 'Create Sub User', screen: SCREENS.CREATE_SUB_USER_SCREEN, roles: ['RT'] },
      { name: 'Change TPIN', screen: SCREENS.CHANGE_TPIN_SCREEN },
      { name: 'My Certificate', screen: SCREENS.MY_CERTIFICATE_SCREEN },
      { name: 'Low Balance Alert', screen: SCREENS.LOW_BALANCE_ALERT_SCREEN, roles: ['RT', 'RA'] },
      { name: 'ID Card', screen: SCREENS.ID_CARD_SCREEN, roles: ['DT', 'SD', 'WL', 'PT'] },
    ],
  },

  // ---------------- Support ----------------
  {
    name: 'Support',
    screen: 'SupportStack',
    icon: 'support-agent',
    roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      { name: 'Bio Metric Device', screen: SCREENS.BIOMETRIC_DEVICE_SCREEN },
      { name: 'Ticketing System', screen: SCREENS.TICKETING_SCREEN },
      { name: 'Contact Us', screen: SCREENS.CONTACT_US_SCREEN },
      { name: 'Top Up Request', screen: SCREENS.TOP_UP_REQUEST_SCREEN },
      { name: 'Top Up History', screen: SCREENS.TOP_UP_HISTORY_SCREEN },
      { name: 'Add Money', screen: SCREENS.ADD_MONEY_SCREEN },
      { name: 'Payment Request', screen: SCREENS.PAYMENT_REQUEST_SCREEN },
      { name: 'Payment History', screen: SCREENS.PAYMENT_HISTORY_SCREEN },
      { name: 'Payment Banks', screen: SCREENS.PAYMENT_BANKS_SCREEN },
    ],
  },

 
];

// ---------------------------------------------------------
// FILTERED MENU BY ROLE
// ---------------------------------------------------------
export const getMenuForRole = (role: Role): MenuItem[] => {
  return allMenuItems
    .filter(item => canAccess(item.roles, role))
    .map(item => {
      if (!item.subItems) return item;

      const sub = item.subItems.filter(sub => canAccess(sub.roles, role));

      if (sub.length === 0) return null;

      return { ...item, subItems: sub };
    })
    .filter(Boolean) as MenuItem[];
};
