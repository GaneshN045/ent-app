// File: @src/screens/Reports/pending_transaction/components/PendingTransactionFilterModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Formik, FormikHelpers } from 'formik';
import DatePickerInput from '../components/DatePickerInput';
import SelectInput from '../components/SelectInput';
import type { PendingTransactionFilterValues, PendingTransactionFilterModalProps } from './types';
import { useActiveProductsListHook } from '../../../hooks/useActiveProductsListHook';
import { useActiveSubProductsListHook } from '../../../hooks/useActiveSubProductsListHook';

interface DropdownOption {
  label: string;
  value: string;
}

const PendingTransactionFilterModal: React.FC<PendingTransactionFilterModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  validationSchema,
  filtersApplied,
}) => {
  const [activeSelect, setActiveSelect] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const navigation = useNavigation<any>();

  // Use custom hooks for products and sub-products
  const {
    options: productOptions,
    isLoading: isLoadingProducts,
    isError: isProductsError,
  } = useActiveProductsListHook();

  const {
    options: subProductOptions,
    isLoading: isLoadingSubProducts,
    isError: isSubProductsError,
  } = useActiveSubProductsListHook(selectedProductId);

  const walletTypeOptions: DropdownOption[] = [
    { label: 'Prepaid', value: 'PREPAID' },
    { label: 'Postpaid', value: 'POSTPAID' },
  ];

  const handleClose = () => {
    setActiveSelect(null);
    onClose();
  };

  const handleBackToDashboard = () => {
    navigation.navigate('ROOT_MAIN', {
      screen: 'BOTTOM_STACK',
      params: { screen: 'DASHBOARD_STACK' },
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View
            className="bg-white px-6 pt-5 pb-8"
            style={{
              elevation: 20,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 15,
              shadowOffset: { width: 0, height: -4 },
              height: '100%',
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <TouchableOpacity
                onPress={handleBackToDashboard}
                className="bg-gray-100 rounded-full px-3 py-2 flex-row items-center gap-1"
              >
                <MaterialIcons name="arrow-back" size={18} color="#2B2B2B" />
                <Text className="text-gray-800 font-semibold text-sm">Back to Dashboard</Text>
              </TouchableOpacity>

              {filtersApplied && (
                <TouchableOpacity onPress={handleClose} className="bg-gray-100 rounded-full p-2">
                  <MaterialIcons name="close" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({
                handleSubmit,
                isSubmitting,
                values,
                setFieldValue,
                errors,
                touched,
                resetForm,
              }) => {
                // Update selected product ID when product value changes
                useEffect(() => {
                  if (values.product) {
                    setSelectedProductId(values.product);
                  } else {
                    setSelectedProductId('');
                  }
                }, [values.product]);

                return (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      paddingBottom: 20,
                    }}
                  >
                    {/* Date Range Section */}
                    <View className="mb-6">
                      <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          Date Range
                        </Text>
                        <View className="bg-red-100 px-2 py-1 rounded">
                          <Text className="text-red-700 text-xs font-bold">REQUIRED</Text>
                        </View>
                      </View>
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
                            error={
                              touched.dateRange?.endDate ? errors.dateRange?.endDate : undefined
                            }
                          />
                        </View>
                      </View>
                    </View>

                    {/* Filters Section */}
                    <View className="mb-2">
                      <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                        Filter Options
                      </Text>

                      {/* Product - Required */}
                      <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-2">
                          <Text className="text-sm font-semibold text-gray-700">Product</Text>
                          <View className="bg-red-100 px-2 py-0.5 rounded">
                            <Text className="text-red-700 text-xs font-bold">REQUIRED</Text>
                          </View>
                        </View>

                        {isLoadingProducts ? (
                          <View className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-row items-center justify-center">
                            <ActivityIndicator size="small" color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-2">Loading products...</Text>
                          </View>
                        ) : isProductsError ? (
                          <View className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <Text className="text-red-700 text-xs text-center">
                              Failed to load products. Please try again.
                            </Text>
                          </View>
                        ) : (
                          <SelectInput
                            label=""
                            value={values.product}
                            onChange={value => {
                              setFieldValue('product', value);
                              // Reset sub-product when product changes
                              setFieldValue('subProduct', '');
                            }}
                            options={productOptions}
                            error={touched.product ? errors.product : undefined}
                            placeholder="Select a product..."
                            identifier="product"
                            activeSelect={activeSelect}
                            onDropdownToggle={setActiveSelect}
                            required
                          />
                        )}
                      </View>

                      {/* Sub Product - Optional, dependent on Product */}
                      <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-2">
                          <Text className="text-sm font-semibold text-gray-700">Sub Product</Text>
                          <View className="bg-gray-100 px-2 py-0.5 rounded">
                            <Text className="text-gray-600 text-xs font-bold">OPTIONAL</Text>
                          </View>
                        </View>

                        {!values.product ? (
                          <View className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <Text className="text-gray-500 text-xs text-center">
                              Please select a product first
                            </Text>
                          </View>
                        ) : isLoadingSubProducts ? (
                          <View className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-row items-center justify-center">
                            <ActivityIndicator size="small" color="#6B7280" />
                            <Text className="text-gray-500 text-xs ml-2">
                              Loading sub-products...
                            </Text>
                          </View>
                        ) : isSubProductsError ? (
                          <View className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <Text className="text-red-700 text-xs text-center">
                              Failed to load sub-products. Please try again.
                            </Text>
                          </View>
                        ) : subProductOptions.length === 0 ? (
                          <View className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <Text className="text-amber-700 text-xs text-center">
                              No sub-products available for selected product
                            </Text>
                          </View>
                        ) : (
                          <SelectInput
                            label=""
                            value={values.subProduct}
                            onChange={value => setFieldValue('subProduct', value)}
                            options={subProductOptions}
                            error={touched.subProduct ? errors.subProduct : undefined}
                            placeholder="Select a sub product..."
                            identifier="subProduct"
                            activeSelect={activeSelect}
                            onDropdownToggle={setActiveSelect}
                            disabled={!values.product}
                          />
                        )}
                      </View>

                      {/* Wallet Type - Optional */}
                      <View className="mb-4">
                        <View className="flex-row items-center justify-between mb-2">
                          <Text className="text-sm font-semibold text-gray-700">Wallet Type</Text>
                          <View className="bg-gray-100 px-2 py-0.5 rounded">
                            <Text className="text-gray-600 text-xs font-bold">OPTIONAL</Text>
                          </View>
                        </View>
                        <SelectInput
                          label=""
                          value={values.walletType}
                          onChange={value => setFieldValue('walletType', value)}
                          options={walletTypeOptions}
                          error={touched.walletType ? errors.walletType : undefined}
                          placeholder="Select wallet type..."
                          identifier="walletType"
                          activeSelect={activeSelect}
                          onDropdownToggle={setActiveSelect}
                        />
                      </View>
                    </View>

                    {/* Status Info Banner */}
                    <View className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                      <View className="flex-row items-start gap-2">
                        <MaterialIcons name="pending-actions" size={18} color="#F59E0B" />
                        <View className="flex-1">
                          <Text className="text-amber-800 text-xs font-semibold mb-1">
                            Transaction Status
                          </Text>
                          <Text className="text-amber-700 text-xs">
                            This report automatically shows only PENDING transactions. Status is
                            hardcoded and cannot be changed.
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-3 mt-6">
                      <TouchableOpacity
                        onPress={() => {
                          resetForm();
                          setActiveSelect(null);
                          setSelectedProductId('');
                        }}
                        disabled={isSubmitting}
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
                        disabled={isSubmitting || isLoadingProducts}
                        className="flex-1 bg-white border-2 border-primary rounded-xl py-4"
                        style={{
                          elevation: 3,
                          shadowColor: '#2563EB',
                          shadowOpacity: 0.3,
                          shadowRadius: 8,
                          shadowOffset: { width: 0, height: 4 },
                        }}
                      >
                        {isSubmitting ? (
                          <View className="flex-row items-center justify-center gap-2">
                            <ActivityIndicator size="small" color="#2563EB" />
                            <Text className="text-primary text-center font-bold text-base">
                              LOADING...
                            </Text>
                          </View>
                        ) : (
                          <Text className="text-primary text-center font-bold text-base">
                            VIEW REPORT
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                );
              }}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PendingTransactionFilterModal;
