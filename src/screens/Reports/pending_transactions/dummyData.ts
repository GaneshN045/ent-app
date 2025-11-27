// File: @src/screens/Reports/pending_transaction/data/dummyData.ts
import type { PendingTransactionTableData } from './types';

const subProducts = [
  'Mobile Prepaid',
  'Mobile Postpaid',
  'DTH Recharge',
  'Electricity Bill',
  'Water Bill',
  'Gas Bill',
  'IMPS Transfer',
  'NEFT Transfer',
  'UPI Payment',
  'AEPS Withdrawal',
];

const vendors = ['Airtel', 'Jio', 'Vi', 'BSNL', 'Tata Play', 'Dish TV', 'MSEB', 'HDFC Bank'];

const schemes = ['Special Offer', 'Regular', 'Promotional', 'Corporate', 'Premium'];
const mediums = ['APP', 'WEB', 'USSD', 'API'];

const walletTypes = ['PREPAID', 'POSTPAID'];

const transactionTypes = ['Recharge', 'Bill Payment', 'Transfer', 'Purchase'];
const remarkOptions = [
  'Awaiting confirmation',
  'Requires verification',
  'Manual intervention',
  'Auto-scheduled',
];

const generateMobile = (): string => {
  const prefix = ['98', '97', '96', '95', '94', '93', '92', '91', '90', '89'];
  return (
    prefix[Math.floor(Math.random() * prefix.length)] +
    Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')
  );
};

const generateUserId = (): string => {
  return (
    'USER' +
    Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0')
  );
};

const generateAmount = (): string => {
  const amounts = [99, 149, 199, 299, 399, 499, 599, 999, 1299, 1999, 2499];
  return amounts[Math.floor(Math.random() * amounts.length)].toFixed(2);
};

const generateDate = (): string => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
};

const generateTime = (): string => {
  const hours = Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const generatePendingTransactionData = (count: number): PendingTransactionTableData[] => {
  const data: PendingTransactionTableData[] = [];

  for (let i = 0; i < count; i++) {
    const txId = `TXN${Date.now()}${i}`.slice(0, 16);
    const date = generateDate();

    data.push({
      txId,
      subProductName: subProducts[Math.floor(Math.random() * subProducts.length)],
      userId: generateUserId(),
      amount: generateAmount(),
      txStatus: 'PENDING', // Always PENDING as per business logic
      dateOfTransaction: date,
      timeOfTransaction: generateTime(),
      updatedDateOfTransaction: date,
      updatedTimeOfTransaction: generateTime(),
      txType: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
      remarks: remarkOptions[Math.floor(Math.random() * remarkOptions.length)],
      vendor: vendors[Math.floor(Math.random() * vendors.length)],
      schemeName: schemes[Math.floor(Math.random() * schemes.length)],
      medium: mediums[Math.floor(Math.random() * mediums.length)],
      mobile: generateMobile(),
      walletType: walletTypes[Math.floor(Math.random() * walletTypes.length)],
    });
  }

  return data;
};
