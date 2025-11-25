export type PrefundResponse = {
  statusCode: number;
  message: string;
  data?: unknown;
};

export type WalletToWalletRequest = {
  hierarchyId: string;
  transferAmount: string;
  confirmAmount: string;
  walletTypeFrom: 'PREPAID' | 'POSTPAID';
  walletTypeTo: 'PREPAID' | 'POSTPAID';
};

export type WalletToWalletResponse = PrefundResponse;

export type MoveToBankRequest = {
  retailerId: string;
  accountNumber: string;
  ifscCode: string;
  amount: string;
  beneficiaryName: string;
  paymentMode: string;
  subProductId: string;
};
