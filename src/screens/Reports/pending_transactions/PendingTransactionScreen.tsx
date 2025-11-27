// File: @src/screens/Reports/pending_transaction/PendingTransaction.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text, Share, Platform, ActivityIndicator } from 'react-native';

import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import RNFS from 'react-native-fs';
import { request, checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
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
  const [isExporting, setIsExporting] = useState(false);

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

    // Store current page data
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

  const handleExport = async () => {
    if (!savedFetchArgs) {
      Alert.alert('No filters applied', 'Please apply filters first');
      return;
    }

    const exportColumns = columnDefinitions.filter(def => visibleColumns[def.key]);
    if (exportColumns.length === 0) {
      Alert.alert('Export', 'Please make at least one column visible to export');
      return;
    }

    setIsExporting(true);

    try {
      // Request permissions for Android
      if (Platform.OS === 'android') {
        console.log('Requesting Android storage permissions...');

        // For Android 10+, request WRITE; for Android 11+, READ (scoped storage)
        type AndroidStoragePermission =
          | typeof PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          | typeof PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

        const androidVersion = Platform.Version;
        let permissionToRequest: AndroidStoragePermission =
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

        if (androidVersion >= 30) {
          permissionToRequest = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }

        const permissionResult = await request(permissionToRequest);
        console.log('Permission result:', permissionResult);

        if (permissionResult !== RESULTS.GRANTED) {
          console.warn('Permission denied:', permissionResult);
          Alert.alert(
            'Permission Required',
            'Storage permission is required to export files. Please enable it in app settings.',
            [
              { text: 'Cancel', onPress: () => setIsExporting(false) },
              { text: 'OK', onPress: () => setIsExporting(false) },
            ],
          );
          return;
        }
      }

      // Fetch all pages to get complete dataset
      const allData: PendingTransactionTableData[] = [];
      const totalPages = Math.ceil(totalRecords / itemsPerPage);

      console.log(`Fetching ${totalPages} pages for export...`);

      for (let page = 1; page <= totalPages; page++) {
        try {
          const fetchArgs: PendingTransactionsFetchArgs = {
            payload: savedFetchArgs.payload,
            page: page - 1,
            size: itemsPerPage,
          };

          const response = await getReportPendingTransactions(fetchArgs);
          const content = response.data?.data?.content ?? [];
          allData.push(...content.map(mapRecordToTableData));
          console.log(`Fetched page ${page}: ${content.length} records`);
        } catch (error) {
          console.error(`Error fetching page ${page}:`, error);
        }
      }

      if (allData.length === 0) {
        Alert.alert('No data', 'No records to export');
        setIsExporting(false);
        return;
      }

      // Generate CSV
      const csvPayload = buildCsvPayload(allData, exportColumns);

      // Create filename
      const fileName = `Pending-Transactions-${new Date().toISOString().split('T')[0]}.csv`;
      let filePath: string;

      // Determine file path based on platform
      if (Platform.OS === 'android') {
        // For Android 10+, use app cache directory
        filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
      } else {
        filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
      }

      console.log(`Writing file to: ${filePath}`);

      // Write file
      await RNFS.writeFile(filePath, csvPayload, 'utf8');

      console.log(`File written successfully`);

      // Share file
      const shareOptions: any = {
        url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
        title: 'Pending Transactions Report',
        message: `Exported ${allData.length} records`,
        filename: fileName,
      };

      console.log('Share options:', shareOptions);

      const result = await Share.share(shareOptions);

      if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      } else {
        Alert.alert(
          'Success',
          `Successfully exported ${allData.length} records\n\nFile: ${fileName}`,
        );
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert(
        'Export Failed',
        `Error: ${error instanceof Error ? error.message : 'Unable to export pending transactions'}`,
      );
    } finally {
      setIsExporting(false);
    }
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

      {isExporting && (
        <View className="px-4 py-3 bg-blue-50 flex-row items-center gap-2">
          <ActivityIndicator size="small" color="#2563eb" />
          <Text className="text-sm text-blue-600 flex-1">Exporting {totalRecords} records...</Text>
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

const buildCsvPayload = (
  rows: PendingTransactionTableData[],
  columns: { key: keyof PendingTransactionTableData; label: string }[],
): string => {
  if (rows.length === 0) return '';

  // Build header row with column labels
  const header = columns.map(col => escapeCsvValue(col.label)).join(',');

  // Build data rows with values mapped to columns
  const dataRows = rows.map(row =>
    columns
      .map(col => {
        const value = row[col.key];
        return escapeCsvValue(value ?? '');
      })
      .join(','),
  );

  // Combine header and data rows
  return [header, ...dataRows].join('\n');
};

const escapeCsvValue = (value: any): string => {
  const stringValue = String(value ?? '').trim();
  
  // Check if value needs to be quoted
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Escape double quotes by doubling them
    const escaped = stringValue.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  
  return stringValue;
};