// File: @src/screens/Reports/commission_charges/CommissionAndCharges.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FilterForm from './components/FilterForm';
import GenericMasterTable from './components/GenericMasterTable';
import Toolbar from './components/Toolbar';
import ShimmerTableRows from './components/ShimmerTableRows';
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
  const [showFilters, setShowFilters] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<Record<keyof TableData, boolean>>(
    getDefaultVisibleColumns(),
  );
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load initial dummy data on mount
  useEffect(() => {
    setTableData(generateCommissionChargesData(100));
  }, []);

  const validationSchema = Yup.object().shape({
    dateRange: Yup.object().shape({
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string().required('End date is required'),
    }),
    product: Yup.string().required('Product is required'),
    hierarchy: Yup.string(),
    walletType: Yup.string().required('Wallet type is required'),
    reportType: Yup.string().required('Report type is required'),
  });

  const initialValues: FilterValues = {
    dateRange: { startDate: '', endDate: '' },
    product: '',
    hierarchy: '',
    walletType: '',
    reportType: '',
  };

  const handleSubmit = async (
    values: FilterValues,
    { setSubmitting }: FormikHelpers<FilterValues>,
  ) => {
    setIsLoading(true);
    setCurrentPage(1);

    // Simulate API call with filter
    setTimeout(() => {
      // Generate new data based on filters
      const filteredData = generateCommissionChargesData(100);
      setTableData(filteredData);
      setIsLoading(false);
      setSubmitting(false);
      Alert.alert('Success', 'Data filtered successfully');
    }, 1500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setCurrentPage(1);
    setVisibleColumns(getDefaultVisibleColumns());

    setTimeout(() => {
      setTableData(generateCommissionChargesData(100));
      setIsLoading(false);
      Alert.alert('Success', 'Data refreshed');
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

  return (
    <View className="flex-1 bg-gray-50">
      <Toolbar
        onRefresh={handleRefresh}
        onExport={handleExport}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onToggleColumns={toggleColumnVisibility}
        onToggleAllColumns={toggleAllColumns}
        visibleColumns={visibleColumns}
        columns={tableColumns}
      />

      {showFilters && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <FilterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          )}
        </Formik>
      )}

      <ScrollView className="flex-1 px-4 py-4">
        {isLoading ? (
          <ShimmerTableRows count={10} />
        ) : (
          <GenericMasterTable
            data={filteredData}
            columns={tableColumns}
            visibleColumns={visibleColumns}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            showFilters={showFilters}
            columnFilters={columnFilters}
            onColumnFilterChange={handleColumnFilterChange}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CommissionAndCharges;
