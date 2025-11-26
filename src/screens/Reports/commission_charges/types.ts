export interface FilterValues {
  dateRange: { startDate: string; endDate: string };
  product: string;
  hierarchy: string;
  hierarchyId: string;
  walletType: string;
  reportType: string;
}

export interface TableData {
  txId: string;
  subProductName: string;
  walletType: string;
  txType: string;
  operator: string;
  balBefore: number;
  amount: number;
  balAfter: number;
  transactionDate: string;
  transactionTime: string;
}
