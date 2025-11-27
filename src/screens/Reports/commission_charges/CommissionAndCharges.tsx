// File: @src/screens/Reports/commission_charges/CommissionAndCharges.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ReportsFilterModal from './ReportsFilterModal';
import GenericMasterTable from '../components/GenericMasterTable';
import Toolbar from '../components/Toolbar';
import TableRowsSkeleton from '../components/TableRowsSkeleton';
import { generateCommissionChargesData } from './data/dummyData';
import type { FilterValues, TableData } from './types';

const tableColumns: (keyof TableData)[] = [
  'txId',
  'subProductName',
  'walletType',
  'txType',
  'operator',
  'balBefore',
  'amount',
  'balAfter',
  'transactionDate',
  'transactionTime',
];

const getDefaultVisibleColumns = (): Record<keyof TableData, boolean> =>
  tableColumns.reduce(
    (acc, column) => {
      acc[column] = true;
      return acc;
    },
    {} as Record<keyof TableData, boolean>,
  );

const CommissionAndCharges: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<Record<keyof TableData, boolean>>(
    getDefaultVisibleColumns(),
  );
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load initial dummy data on mount
  useEffect(() => {
    setTableData(generateCommissionChargesData(100));
  }, []);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    dateRange: Yup.object().shape({
      startDate: Yup.string()
        .required('Start date is required')
        .test('is-valid-date', 'Invalid date format', value => {
          if (!value) return false;
          const date = new Date(value);
          return date instanceof Date && !isNaN(date.getTime());
        }),
      endDate: Yup.string()
        .required('End date is required')
        .test('is-valid-date', 'Invalid date format', value => {
          if (!value) return false;
          const date = new Date(value);
          return date instanceof Date && !isNaN(date.getTime());
        })
        .test('is-after-start', 'End date must be after start date', function (value) {
          const { startDate } = this.parent;
          if (!startDate || !value) return true;
          return new Date(value) >= new Date(startDate);
        }),
    }),
    product: Yup.string().required('Product is required'),
    hierarchy: Yup.string().nullable(),
    hierarchyId: Yup.string().nullable(),
    walletType: Yup.string().required('Wallet type is required'),
    reportType: Yup.string().required('Report type is required'),
  });

  // Initial form values
  const initialValues: FilterValues = {
    dateRange: {
      startDate: '',
      endDate: '',
    },
    product: '',
    hierarchy: '',
    hierarchyId: '',
    walletType: '',
    reportType: '',
  };

  const handleSubmit = async (
    values: FilterValues,
    { setSubmitting }: FormikHelpers<FilterValues>,
  ) => {
    try {
      setIsLoading(true);
      setCurrentPage(1);

      // Log the submitted values for debugging
      console.log('Filter values:', values);

      // Simulate API call with filter
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate new data based on filters
      const filteredData = generateCommissionChargesData(100);
      setTableData(filteredData);

      setShowFilterModal(false);
      Alert.alert('Success', 'Filters applied successfully');
      setFiltersApplied(true);
    } catch (error) {
      console.error('Filter error:', error);
      Alert.alert('Error', 'Failed to apply filters');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setCurrentPage(1);
    setVisibleColumns(getDefaultVisibleColumns());
    setColumnFilters({});

    setTimeout(() => {
      setTableData(generateCommissionChargesData(100));
      setIsLoading(false);
      setFiltersApplied(false);
      setShowFilterModal(true);
      // Alert.alert('Success', 'Data refreshed');
    }, 1500);
  };

  const handleExport = () => {
    if (tableData.length === 0) {
      Alert.alert('No data', 'No records to export');
      return;
    }
    Alert.alert('Export', `Exporting ${tableData.length} records to CSV...`);
    // Add your export logic here
  };

  const handleColumnFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1);
  };

  const getFilteredData = () => {
    if (Object.values(columnFilters).every(v => !v)) {
      return tableData;
    }

    return tableData.filter(row => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[column as keyof TableData]).toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });
  };

  const filteredData = getFilteredData();

  const toggleColumnVisibility = (column: keyof TableData) => {
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
      {} as Record<keyof TableData, boolean>,
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

      <ReportsFilterModal
        visible={showFilterModal}
        onClose={() => requestCloseFilters()}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        filtersApplied={filtersApplied}
      />

      <ScrollView className="flex-1 px-4 py-4">
        {isLoading ? (
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
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CommissionAndCharges;
