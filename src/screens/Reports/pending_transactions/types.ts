// File: @src/screens/Reports/pending_transaction/types.ts

import type { FormikHelpers } from 'formik';
import type { ObjectSchema } from 'yup';

/**
 * Date range controlled by the filter form
 */
export interface PendingTransactionDateRange {
  startDate: string; // Format: YYYY-MM-DD
  endDate: string; // Format: YYYY-MM-DD (max 7 days from startDate)
}

/**
 * Filter form values for Pending Transaction Report
 * Used in the filter modal for submitting search criteria
 */
export interface PendingTransactionFilterValues {
  dateRange: PendingTransactionDateRange;
  product: string; // Required - Product ID
  subProduct: string; // Optional - Sub Product ID (dependent on product)
  walletType: string; // Optional - PREPAID or POSTPAID
}

/**
 * Table row data structure for Pending Transaction Report
 * Represents a single pending transaction record
 */
export interface PendingTransactionTableData {
  // Visible by default
  txId: string; // Transaction ID
  subProductName: string; // Sub Product Name
  userId: string; // User ID
  amount: string; // Transaction Amount (formatted as string with decimals)
  txStatus: string; // Transaction Status (always "PENDING" for this report)
  dateOfTransaction: string; // Date of transaction (YYYY-MM-DD)
  timeOfTransaction: string; // Time of transaction (HH:MM:SS)
  updatedDateOfTransaction?: string; // Date when record was last updated
  updatedTimeOfTransaction?: string; // Time when record was last updated
  txType?: string; // Transaction type description
  remarks?: string; // Any remark for the transaction

  // Hidden by default - can be toggled via column visibility
  vendor?: string; // Vendor name
  schemeName?: string; // Scheme name (backend field)
  mobile?: string; // Mobile number
  walletType?: string; // Wallet type (PREPAID/POSTPAID)
  medium?: string; // Medium (if provided)
}

/**
 * API payload structure for fetching pending transactions
 * This is what gets sent to the backend
 */
export interface PendingTransactionPayload {
  dateRange: PendingTransactionDateRange;
  product: string;
  subProduct?: string;
  walletType?: string;
  tranStatus: 'PENDING'; // Hardcoded to PENDING
  page?: number;
  pageSize?: number;
  filters?: Record<string, string>; // Table column filters
}

/**
 * API response structure for pending transactions
 */
export interface PendingTransactionResponse {
  success: boolean;
  data: PendingTransactionTableData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    pageSize: number;
  };
  message?: string;
}

/**
 * Product dropdown option
 */
export interface ProductOption {
  label: string;
  value: string;
}

/**
 * Sub Product dropdown option with parent product reference
 */
export interface SubProductOption {
  label: string;
  value: string;
  productId: string; // Reference to parent product
}

/**
 * Column visibility state
 */
export type ColumnVisibility = Record<keyof PendingTransactionTableData, boolean>;

/**
 * Column filter state (for table search)
 */
export type ColumnFilters = Record<string, string>;

/**
 * Pagination state
 */
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

/**
 * Sort configuration (if sorting is added later)
 */
export interface SortConfig {
  column: keyof PendingTransactionTableData | null;
  direction: 'asc' | 'desc';
}

/**
 * Transaction status enum
 */
export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
}

/**
 * Wallet type enum
 */
export enum WalletType {
  PREPAID = 'PREPAID',
  POSTPAID = 'POSTPAID',
}

/**
 * Export format options
 */
export enum ExportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
  PDF = 'pdf',
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
  details?: Record<string, any>;
}

/**
 * Loading state for different operations
 */
export interface LoadingState {
  isLoadingData: boolean;
  isLoadingProducts: boolean;
  isLoadingSubProducts: boolean;
  isExporting: boolean;
}

/**
 * Table props interface
 */
export interface PendingTransactionTableProps {
  data: PendingTransactionTableData[];
  columns: (keyof PendingTransactionTableData)[];
  visibleColumns: ColumnVisibility;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showFilters?: boolean;
  columnFilters?: ColumnFilters;
  onColumnFilterChange?: (column: string, value: string) => void;
  isLoading?: boolean;
  onSort?: (column: keyof PendingTransactionTableData) => void;
  sortConfig?: SortConfig;
}

/**
 * Filter modal props interface
 */
export interface PendingTransactionFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (
    values: PendingTransactionFilterValues,
    helpers: FormikHelpers<PendingTransactionFilterValues>,
  ) => void | Promise<void>;
  initialValues: PendingTransactionFilterValues;
  validationSchema: ObjectSchema<PendingTransactionFilterValues>;
  filtersApplied: boolean;
  isLoadingProducts?: boolean;
  isLoadingSubProducts?: boolean;
  onReset?: () => void;
}
