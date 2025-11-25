// File: @src/screens/Reports/commission_charges/components/FilterForm.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';
import DatePickerInput from './inputs/DatePickerInput';
import SelectInput from './inputs/SelectInput';
import type { FilterValues } from '../types';

interface FilterFormProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit, isSubmitting }) => {
  const { values, setFieldValue, errors } = useFormikContext<FilterValues>();

  return (
    <View className="bg-white border-b border-gray-200 p-4">
      <View className="gap-4">
        {/* Date Range */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <DatePickerInput
              label="Start Date"
              value={values.dateRange.startDate}
              onChange={date => setFieldValue('dateRange.startDate', date)}
              error={errors.dateRange?.startDate}
            />
          </View>

          <View className="flex-1">
            <DatePickerInput
              label="End Date"
              value={values.dateRange.endDate}
              onChange={date => setFieldValue('dateRange.endDate', date)}
              error={errors.dateRange?.endDate}
            />
          </View>
        </View>

        {/* Product & Hierarchy */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <SelectInput
              label="Product"
              value={values.product}
              onChange={value => setFieldValue('product', value)}
              options={[
                { label: 'Product A', value: 'product_a' },
                { label: 'Product B', value: 'product_b' },
              ]}
              error={errors.product}
            />
          </View>

          <View className="flex-1">
            <SelectInput
              label="Hierarchy"
              value={values.hierarchy}
              onChange={value => setFieldValue('hierarchy', value)}
              options={[
                { label: 'Region 1', value: 'region_1' },
                { label: 'Region 2', value: 'region_2' },
              ]}
              error={errors.hierarchy}
            />
          </View>
        </View>

        {/* Wallet Type & Report Type */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <SelectInput
              label="Wallet Type"
              value={values.walletType}
              onChange={value => setFieldValue('walletType', value)}
              options={[
                { label: 'Main Wallet', value: 'main' },
                { label: 'Sub Wallet', value: 'sub' },
              ]}
              error={errors.walletType}
            />
          </View>

          <View className="flex-1">
            <SelectInput
              label="Report Type"
              value={values.reportType}
              onChange={value => setFieldValue('reportType', value)}
              options={[
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
              ]}
              error={errors.reportType}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={onSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 rounded-lg py-3 active:bg-blue-700"
        >
          <Text className="text-white text-center font-semibold">
            {isSubmitting ? 'Loading...' : 'VIEW'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterForm;
