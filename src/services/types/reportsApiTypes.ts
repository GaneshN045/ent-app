// File: app/services/types/profileApiTypes.ts

export interface ProductData {
  id: number;
  productName: string;
  productCode: string;
  isSettlement: boolean;
}

export interface ProductDropdownResponse {
  statusCode: number;
  message: string;
  data: ProductData[];
}

export interface SubProductData {
  id: string;
  subProduct_name: string;
  subProduct_code: string;
}

export interface SubProductDropdownResponse {
  statusCode: number;
  message: string;
  data: SubProductData[];
}

export interface PendingTransactionRecord {
  id: number;
  updatedAt: string | null;
  userId: string;
  mobileNo: string | null;
  schemeName: string | null;
  amount: number;
  txStatus: string;
  txType: string | null;
  remarks: string | null;
  txId: string;
  medium: string | null;
  subProductName: string;
  vendor: string | null;
  dateOfTransaction: string;
  timeOfTransaction: string;
  updatedDateOfTransaction: string | null;
  updatedTimeOfTransaction: string | null;
  walletType?: string | null;
}

export interface PendingTransactionsPage {
  content: PendingTransactionRecord[];
  pageable: {
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  numberOfElements: number;
  empty: boolean;
}

export interface PendingTransactionsResponse {
  statusCode: number;
  message: string;
  data: PendingTransactionsPage;
}

export interface PendingTransactionRequestPayload {
  fromDate: string;
  toDate: string;
  productId: string;
  subProductId?: string;
  walletType?: string;
  tranStatus: 'PENDING';
}

export interface PendingTransactionsFetchArgs {
  payload: PendingTransactionRequestPayload;
  page?: number;
  size?: number;
}
