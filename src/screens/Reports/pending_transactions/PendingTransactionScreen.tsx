// File: @src/screens/Reports/pending_transaction/PendingTransaction.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';

import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PendingTransactionFilterModal from './PendingTransactionFilterModal';
import GenericMasterTable from '../components/GenericMasterTable';
import Toolbar from '../components/Toolbar';
import TableRowsSkeleton from '../components/TableRowsSkeleton';
import type {
  PendingTransactionFilterValues,
  PendingTransactionTableData,
  ColumnVisibility,
} from './types';
import {
  PendingTransactionRecord,
  PendingTransactionRequestPayload,
  PendingTransactionsFetchArgs,
} from '../../../services/types/reportsApiTypes';
import { useLazyGetReportPendingTransactionsQuery } from '../../../services/api/reportsApi';

const columnDefinitions: {
  key: keyof PendingTransactionTableData;
  label: string;
  visibleByDefault?: boolean;
}[] = [
  { key: 'txId', label: 'Transaction ID', visibleByDefault: true },
  { key: 'subProductName', label: 'Sub Product Name', visibleByDefault: true },
  { key: 'userId', label: 'User ID', visibleByDefault: true },
  { key: 'amount', label: 'Amount', visibleByDefault: true },
  { key: 'txStatus', label: 'Transaction Status', visibleByDefault: true },
  { key: 'dateOfTransaction', label: 'Transaction Date', visibleByDefault: true },
  { key: 'timeOfTransaction', label: 'Transaction Time', visibleByDefault: true },
  { key: 'vendor', label: 'Vendor', visibleByDefault: true },
  { key: 'schemeName', label: 'Scheme Name', visibleByDefault: true },
  { key: 'mobile', label: 'Mobile No', visibleByDefault: true },
  { key: 'walletType', label: 'Wallet Type', visibleByDefault: true },
  { key: 'txType', label: 'Transaction Type', visibleByDefault: true },
  { key: 'remarks', label: 'Remarks', visibleByDefault: true },
  { key: 'medium', label: 'Medium', visibleByDefault: true },
  { key: 'updatedDateOfTransaction', label: 'Updated Date', visibleByDefault: true },
  { key: 'updatedTimeOfTransaction', label: 'Updated Time', visibleByDefault: true },
];

const tableColumns: (keyof PendingTransactionTableData)[] = columnDefinitions.map(
  definition => definition.key,
);

const getDefaultVisibleColumns = (): ColumnVisibility =>
  columnDefinitions.reduce((acc, column) => {
    acc[column.key] = column.visibleByDefault ?? true;
    return acc;
  }, {} as ColumnVisibility);

const mapRecordToTableData = (record: PendingTransactionRecord): PendingTransactionTableData => ({
  txId: record.txId,
  subProductName: record.subProductName,
  userId: record.userId,
  amount: record.amount?.toString() ?? '0.00',
  txStatus: record.txStatus,
  dateOfTransaction: record.dateOfTransaction,
  timeOfTransaction: record.timeOfTransaction,
  vendor: record.vendor ?? '',
  schemeName: record.schemeName ?? '',
  mobile: record.mobileNo ?? '',
  walletType: record.walletType ?? '',
  txType: record.txType ?? '',
  remarks: record.remarks ?? '',
  medium: record.medium ?? '',
  updatedDateOfTransaction: record.updatedDateOfTransaction ?? undefined,
  updatedTimeOfTransaction: record.updatedTimeOfTransaction ?? undefined,
});

const initialValues: PendingTransactionFilterValues = {
  dateRange: {
    startDate: '',
    endDate: '',
  },
  product: '',
  subProduct: '',
  walletType: '',
};

const validationSchema: Yup.ObjectSchema<PendingTransactionFilterValues> = Yup.object({
  dateRange: Yup.object().shape({
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
  }),
  product: Yup.string().required('Product is required'),
  subProduct: Yup.string().default(''),
  walletType: Yup.string().default(''),
});

const PendingTransaction: React.FC = () => {
  const [showFilterModal, setShowFilterModal] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<ColumnVisibility>(
    getDefaultVisibleColumns(),
  );
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Store only current page data from API
  const [currentPageData, setCurrentPageData] = useState<PendingTransactionTableData[]>([]);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [savedFetchArgs, setSavedFetchArgs] = useState<PendingTransactionsFetchArgs | null>(null);
  const [filterFormValues, setFilterFormValues] =
    useState<PendingTransactionFilterValues>(initialValues);
  const [totalRecords, setTotalRecords] = useState(0);

  const [getReportPendingTransactions, { data, error, isLoading: isQueryLoading }] =
    useLazyGetReportPendingTransactionsQuery();

  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  // Handle data updates from API response
  useEffect(() => {
    if (!data?.data?.content) return;

    const mappedData = data.data.content.map(mapRecordToTableData);

    // Get totalElements from API response for accurate pagination
    const total = data.data.totalElements ?? mappedData.length;
    setTotalRecords(total);

    // Store ONLY current page data (API already returns paginated data)
    setCurrentPageData(mappedData);

    // Reset column filters when new page loads
    setColumnFilters({});
  }, [data]);

  // Handle errors
  useEffect(() => {
    if (!error) return;
    const message =
      (error as any)?.data?.message ??
      (error as any)?.error ??
      (error as any)?.message ??
      'Failed to load pending transactions';
    setErrorMessage(message);
  }, [error]);

  // Handle pagination - fetch next/prev page when currentPage changes
  useEffect(() => {
    if (!savedFetchArgs) return;

    const fetchArgs: PendingTransactionsFetchArgs = {
      payload: savedFetchArgs.payload,
      page: currentPage - 1,
      size: itemsPerPage,
    };
    const shouldShowLoader = currentPage > 1;
    if (shouldShowLoader) setIsNextPageLoading(true);

    getReportPendingTransactions(fetchArgs)
      .catch(err => {
        console.error('Pending transactions pagination error:', err);
        setErrorMessage('Unable to load that page of pending transactions.');
      })
      .finally(() => {
        if (shouldShowLoader) setIsNextPageLoading(false);
      });
  }, [currentPage, savedFetchArgs, getReportPendingTransactions]);

  const handleSubmit = async (
    values: PendingTransactionFilterValues,
    { setSubmitting }: FormikHelpers<PendingTransactionFilterValues>,
  ) => {
    const payload: PendingTransactionRequestPayload = {
      fromDate: values.dateRange.startDate,
      toDate: values.dateRange.endDate,
      productId: values.product,
      subProductId: values.subProduct || undefined,
      walletType: values.walletType || undefined,
      tranStatus: 'PENDING',
    };

    const fetchArgs: PendingTransactionsFetchArgs = {
      payload,
      page: 0,
      size: itemsPerPage,
    };

    setFilterFormValues(values);
    setCurrentPage(1);
    setSavedFetchArgs(fetchArgs);
    setErrorMessage(null);
    setColumnFilters({});

    try {
      await getReportPendingTransactions(fetchArgs);
      setFiltersApplied(true);
      setShowFilterModal(false);
      Alert.alert('Success', 'Filters applied successfully');
    } catch (fetchError) {
      console.error('Filter error:', fetchError);
      const message =
        (fetchError as any)?.data?.message ??
        (fetchError as any)?.message ??
        'Failed to load pending transactions';
      setErrorMessage(message);
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRefresh = () => {
    if (!savedFetchArgs) {
      Alert.alert('No filters applied', 'Please apply filters first');
      return;
    }

    // Refetch first page with current filters
    const fetchArgs: PendingTransactionsFetchArgs = {
      payload: savedFetchArgs.payload,
      page: 0,
      size: itemsPerPage,
    };

    setCurrentPage(1);
    setColumnFilters({});
    setErrorMessage(null);

    getReportPendingTransactions(fetchArgs).catch(err => {
      console.error('Refresh error:', err);
      setErrorMessage('Failed to refresh data');
    });
  };

  const handleReset = () => {
    setCurrentPage(1);
    setVisibleColumns(getDefaultVisibleColumns());
    setColumnFilters({});
    setCurrentPageData([]);
    setFiltersApplied(false);
    setSavedFetchArgs(null);
    setShowFilterModal(true);
    setErrorMessage(null);
    setFilterFormValues(initialValues);
    setTotalRecords(0);
  };

  const handleExport = () => {
    if (currentPageData.length === 0) {
      Alert.alert('No data', 'No records to export');
      return;
    }
    Alert.alert('Export', `Exporting ${totalRecords} records to CSV...`);
    // Add your export logic here
  };

  const handleColumnFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value,
    }));
  };

  // Apply column filters only to current page data
  const getFilteredData = () => {
    if (Object.values(columnFilters).every(v => !v)) {
      return currentPageData;
    }

    return currentPageData.filter(row => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[column as keyof PendingTransactionTableData]).toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });
  };

  const filteredData = getFilteredData();

  const toggleColumnVisibility = (column: keyof PendingTransactionTableData) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const toggleAllColumns = () => {
    const allVisible = tableColumns.every(col => visibleColumns[col]);
    const newState = tableColumns.reduce(
      (acc, column) => {
        acc[column] = !allVisible;
        return acc;
      },
      {} as Record<keyof PendingTransactionTableData, boolean>,
    );
    setVisibleColumns(newState);
  };

  const requestCloseFilters = () => {
    if (filtersApplied) {
      setShowFilterModal(false);
      return;
    }
    Alert.alert('Filters required', 'Please submit the filters before viewing the data.');
  };

  const toggleFilters = () => {
    if (showFilterModal) {
      requestCloseFilters();
    } else {
      setShowFilterModal(true);
    }
  };

  const toggleSearchInputs = () => {
    if (!filtersApplied) {
      Alert.alert('Filters required', 'Please submit filters before searching.');
      return;
    }
    setSearchActive(prev => !prev);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Toolbar
        onRefresh={handleRefresh}
        onExport={handleExport}
        onToggleFilters={toggleFilters}
        onToggleColumns={toggleColumnVisibility}
        onToggleAllColumns={toggleAllColumns}
        visibleColumns={visibleColumns}
        columns={tableColumns}
        onToggleSearch={toggleSearchInputs}
        searchActive={searchActive}
      />

      {errorMessage && (
        <View className="px-4 py-4">
          <Text className="text-red-500">{errorMessage}</Text>
        </View>
      )}

      <PendingTransactionFilterModal
        visible={showFilterModal}
        onClose={() => requestCloseFilters()}
        initialValues={filterFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        filtersApplied={filtersApplied}
        onReset={() => handleReset()}
      />

      <ScrollView className="flex-1 px-4 py-4">
        {isQueryLoading ? (
          <TableRowsSkeleton count={10} />
        ) : (
          <GenericMasterTable
            data={filteredData}
            columns={tableColumns}
            visibleColumns={visibleColumns}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            showFilters={searchActive}
            columnFilters={columnFilters}
            onColumnFilterChange={handleColumnFilterChange}
            totalElements={totalRecords}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default PendingTransaction;
