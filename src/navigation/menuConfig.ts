import SCREENS from '../constants/screens';

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------
export type Role = 'WL' | 'SD' | 'DT' | 'PT' | 'EN' | 'RT' | 'RA';

export interface MenuItem {
  name: string;
  screen: string; // parent stack name OR dashboard screen
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
    screen: SCREENS.DASHBOARD_STACK, // correct
    icon: 'dashboard',
    roles: ROLE_HIERARCHY,
  },

  // ---------------- Manage User ----------------
  {
    name: 'Manage User',
    screen: SCREENS.MANAGE_USER_STACK,
    icon: 'people',
    roles: ['DT', 'SD', 'WL', 'PT'],
    subItems: [
      {
        name: 'Create User',
        screen: SCREENS.CREATE_USER_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Debit & Credit User',
        screen: SCREENS.DEBIT_CREDIT_USER_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'View User',
        screen: SCREENS.VIEW_USER_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
    ],
  },

  // ---------------- Products ----------------
  {
    name: 'Products',
    screen: SCREENS.PRODUCTS_STACK,
    icon: 'inventory',
    roles: ['RT', 'RA'],
  },

  // ---------------- Funding ----------------
  {
    name: 'Funding',
    screen: SCREENS.FUNDING_STACK,
    icon: 'account-balance-wallet',
    roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      {
        name: 'Fund Request',
        screen: SCREENS.FUND_REQUEST_SCREEN,
        roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Wallet To Wallet',
        screen: SCREENS.WALLET_TO_WALLET_SCREEN,
        roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Fund Transfer',
        screen: SCREENS.FUND_TRANSFER_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Fund Reversal',
        screen: SCREENS.FUND_REVERSAL_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Move To Bank',
        screen: SCREENS.WALLET_TO_BANK_SCREEN,
        roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
      },
    ],
  },

  // ---------------- Reports ----------------
  {
    name: 'Reports',
    screen: SCREENS.REPORTS_STACK,
    icon: 'assessment',
    roles: ['DT', 'RT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      {
        name: 'Commission & Charges',
        screen: SCREENS.COMMISSION_CHARGES_SCREEN,
        roles: ['DT', 'RT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Wallet Report',
        screen: SCREENS.WALLET_REPORT_SCREEN,
        roles: ['DT', 'RT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Network Transaction',
        screen: SCREENS.NETWORK_TRANSACTION_SCREEN,
        roles: ['DT', 'RT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Search Transaction',
        screen: SCREENS.SEARCH_TRANSACTION_SCREEN,
        roles: ['DT', 'RT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Fund Loading',
        screen: SCREENS.FUND_LOADING_SCREEN,
        roles: ['RT', 'RA'],
      },
      {
        name: 'Pending Transaction',
        screen: SCREENS.PENDING_TRANSACTION_SCREEN,
        roles: ['RT', 'RA'],
      },
      {
        name: 'Debit History',
        screen: SCREENS.DEBIT_HISTORY_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Down Line Balance',
        screen: SCREENS.DOWNLINE_BALANCE_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
    ],
  },

  // ---------------- Settings ----------------
  {
    name: 'Settings',
    screen: SCREENS.SETTINGS_STACK,
    icon: 'settings',
    roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      {
        name: 'Create Sub User',
        screen: SCREENS.CREATE_SUB_USER_SCREEN,
        roles: ['RT'],
      },
      {
        name: 'Change TPIN',
        screen: SCREENS.CHANGE_TPIN_SCREEN,
        roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'My Certificate',
        screen: SCREENS.MY_CERTIFICATE_SCREEN,
        roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
      },
      { name: 'Low Balance Alert', screen: SCREENS.LOW_BALANCE_ALERT_SCREEN, roles: ['RT', 'RA'] },
      { name: 'ID Card', screen: SCREENS.ID_CARD_SCREEN, roles: ['DT', 'SD', 'WL', 'PT'] },
    ],
  },

  // ---------------- Support ----------------
  {
    name: 'Support',
    screen: SCREENS.SUPPORT_STACK,
    icon: 'support-agent',
    roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
    subItems: [
      {
        name: 'Bio Metric Device',
        screen: SCREENS.BIOMETRIC_DEVICE_SCREEN,
        roles: ['RT', 'RA'],
      },
      {
        name: 'Ticketing System',
        screen: SCREENS.TICKETING_SCREEN,
        roles: ['RT', 'DT', 'SD', 'WL', 'PT', 'RA'],
      },
      {
        name: 'Contact Us',
        screen: SCREENS.CONTACT_US_SCREEN,
        roles: ['RT', 'SD', 'WL', 'RA'],
      },
      {
        name: 'Top Up Request',
        screen: SCREENS.TOP_UP_REQUEST_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Top Up History',
        screen: SCREENS.TOP_UP_HISTORY_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Add Money',
        screen: SCREENS.ADD_MONEY_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Payment Request',
        screen: SCREENS.PAYMENT_REQUEST_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Payment History',
        screen: SCREENS.PAYMENT_HISTORY_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
      {
        name: 'Payment Banks',
        screen: SCREENS.PAYMENT_BANKS_SCREEN,
        roles: ['DT', 'SD', 'WL', 'PT'],
      },
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
