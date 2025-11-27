// File: @src/screens/Reports/commission_charges/data/dummyData.ts
import type { TableData } from '../types';

const PRODUCTS = ['Payout', 'Wallet Transfer', 'Bill Payment', 'Recharge', 'DTH', 'Fast Tag'];
const WALLET_TYPES = ['PREPAID', 'POSTPAID', 'CORPORATE', 'SAVINGS'];
const TX_TYPES = ['Commission', 'Charge', 'Deduction', 'Credit'];
const OPERATORS = ['Operator A', 'Operator B', 'Operator C', 'Operator D', 'Operator E'];

const formatCurrencyValue = (value: number) => Number(value.toFixed(2));

export const generateCommissionChargesData = (count: number = 100): TableData[] => {
  const data: TableData[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(i / 4);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    const balBefore = Math.round(Math.random() * 500000) / 100;
    const amount = Math.round(Math.random() * 50000) / 100;
    const balAfter = balBefore - amount;

    data.push({
      txId: `TXN-${String(i + 1).padStart(8, '0')}`,
      subProductName: PRODUCTS[i % PRODUCTS.length],
      walletType: WALLET_TYPES[i % WALLET_TYPES.length],
      txType: TX_TYPES[i % TX_TYPES.length],
      operator: OPERATORS[i % OPERATORS.length],
      balBefore: formatCurrencyValue(balBefore),
      amount: formatCurrencyValue(amount),
      balAfter: formatCurrencyValue(balAfter),
      transactionDate: date.toISOString().split('T')[0],
      transactionTime: new Date(date.getTime() + Math.random() * 86400000)
        .toISOString()
        .split('T')[1]
        .split('.')[0],
    });
  }

  return data;
};

// Default export with 50 records
export const COMMISSION_CHARGES_DUMMY_DATA = generateCommissionChargesData(50);
