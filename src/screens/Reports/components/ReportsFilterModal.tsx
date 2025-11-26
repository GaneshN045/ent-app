// File: @src/screens/Reports/commission_charges/components/FilterForm.tsx
import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SCREENS from '../../../constants/screens';

import { Formik, FormikHelpers } from 'formik';
import DatePickerInput from './DatePickerInput';
import SelectInput from './SelectInput';
import type { FilterValues } from '../commission_charges/types';

interface ReportsFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: FilterValues, helpers: FormikHelpers<FilterValues>) => void;
  initialValues: FilterValues;
  validationSchema: any;
  filtersApplied: any;
}

const ReportsFilterModal: React.FC<ReportsFilterModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  validationSchema,
  filtersApplied,
}) => {
  const [activeSelect, setActiveSelect] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleClose = () => {
    setActiveSelect(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      // onRequestClose={handleClose}
      // statusBarTranslucent
    >
      <StatusBar barStyle={'dark-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View
            className="bg-white  px-6 pt-5 pb-8"
            style={{
              elevation: 20,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 15,
              shadowOffset: { width: 0, height: -4 },
              height: '100%',
            }}
          >
            <View className="flex-row items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREENS.ROOT_MAIN, {
                    screen: SCREENS.BOTTOM_STACK,
                    params: { screen: SCREENS.DASHBOARD_STACK },
                  });
                }}
                className="bg-gray-100 rounded-full px-3 py-2 flex-row items-center gap-1"
              >
                <MaterialIcons name="arrow-back" size={18} color="#2B2B2B" />
                <Text className="text-gray-800 font-semibold text-sm">Back to Dashboard</Text>
              </TouchableOpacity>

              {filtersApplied && (
                <TouchableOpacity onPress={handleClose} className="bg-gray-100 rounded-full p-2">
                  <Text className="text-gray-600 text-xl font-bold">✕</Text>
                </TouchableOpacity>
              )}
            </View>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                handleSubmit,
                isSubmitting,
                values,
                setFieldValue,
                errors,
                touched,
                resetForm,
              }) => (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    paddingBottom: 20,
                  }}
                >
                  <View className="mb-6">
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Date Range
                    </Text>
                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <DatePickerInput
                          label="Start Date"
                          value={values.dateRange.startDate}
                          onChange={date => setFieldValue('dateRange.startDate', date)}
                          error={
                            touched.dateRange?.startDate ? errors.dateRange?.startDate : undefined
                          }
                        />
                      </View>
                      <View className="flex-1">
                        <DatePickerInput
                          label="End Date"
                          value={values.dateRange.endDate}
                          onChange={date => setFieldValue('dateRange.endDate', date)}
                          error={touched.dateRange?.endDate ? errors.dateRange?.endDate : undefined}
                        />
                      </View>
                    </View>
                  </View>

                  <View className="mb-2">
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Report Filters
                    </Text>

                    <SelectInput
                      label="Product"
                      value={values.product}
                      onChange={value => setFieldValue('product', value)}
                      options={[
                        { label: 'Product Alpha', value: 'product_alpha' },
                        { label: 'Product Beta', value: 'product_beta' },
                        { label: 'Product Gamma', value: 'product_gamma' },
                        { label: 'Product Delta', value: 'product_delta' },
                      ]}
                      error={touched.product ? errors.product : undefined}
                      placeholder="Search products..."
                      identifier="product"
                      activeSelect={activeSelect}
                      onDropdownToggle={setActiveSelect}
                    />

                    <SelectInput
                      label="Hierarchy"
                      value={values.hierarchy}
                      onChange={value => setFieldValue('hierarchy', value)}
                      options={[
                        { label: 'North Region', value: 'north' },
                        { label: 'South Region', value: 'south' },
                        { label: 'East Region', value: 'east' },
                        { label: 'West Region', value: 'west' },
                      ]}
                      error={touched.hierarchy ? errors.hierarchy : undefined}
                      placeholder="Search hierarchy..."
                      identifier="hierarchy"
                      activeSelect={activeSelect}
                      onDropdownToggle={setActiveSelect}
                    />

                    <SelectInput
                      label="Hierarchy ID"
                      value={values.hierarchyId}
                      onChange={value => setFieldValue('hierarchyId', value)}
                      options={[
                        { label: 'HR-001 - Mumbai Office', value: 'hr_001' },
                        { label: 'HR-002 - Delhi Office', value: 'hr_002' },
                        { label: 'HR-003 - Bangalore Office', value: 'hr_003' },
                        { label: 'HR-004 - Hyderabad Office', value: 'hr_004' },
                        { label: 'HR-005 - Chennai Office', value: 'hr_005' },
                      ]}
                      error={touched.hierarchyId ? errors.hierarchyId : undefined}
                      placeholder="Search hierarchy ID..."
                      identifier="hierarchyId"
                      activeSelect={activeSelect}
                      onDropdownToggle={setActiveSelect}
                    />

                    <SelectInput
                      label="Wallet Type"
                      value={values.walletType}
                      onChange={value => setFieldValue('walletType', value)}
                      options={[
                        { label: 'Main Wallet', value: 'main' },
                        { label: 'Secondary Wallet', value: 'secondary' },
                        { label: 'Commission Wallet', value: 'commission' },
                      ]}
                      error={touched.walletType ? errors.walletType : undefined}
                      placeholder="Search wallet type..."
                      identifier="walletType"
                      activeSelect={activeSelect}
                      onDropdownToggle={setActiveSelect}
                    />

                    <SelectInput
                      label="Report Type"
                      value={values.reportType}
                      onChange={value => setFieldValue('reportType', value)}
                      options={[
                        { label: 'Daily Report', value: 'daily' },
                        { label: 'Weekly Report', value: 'weekly' },
                        { label: 'Monthly Report', value: 'monthly' },
                      ]}
                      error={touched.reportType ? errors.reportType : undefined}
                      placeholder="Search report type..."
                      identifier="reportType"
                      activeSelect={activeSelect}
                      onDropdownToggle={setActiveSelect}
                    />
                  </View>

                  <View className="flex-row gap-3 mt-6">
                    <TouchableOpacity
                      onPress={() => {
                        resetForm();
                        setActiveSelect(null);
                      }}
                      className="flex-1 bg-gray-100 rounded-xl py-4"
                    >
                      <Text className="text-gray-700 text-center font-semibold text-base">
                        RESET
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setActiveSelect(null);
                        handleSubmit();
                      }}
                      disabled={isSubmitting}
                      className="flex-1 bg-white border border-primary rounded-xl py-4"
                      style={{
                        elevation: 3,
                        shadowColor: '#2563EB',
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        shadowOffset: { width: 0, height: 4 },
                      }}
                    >
                      <Text className="text-primary text-center font-bold text-base">
                        {isSubmitting ? 'LOADING...' : 'VIEW REPORT'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ReportsFilterModal;
