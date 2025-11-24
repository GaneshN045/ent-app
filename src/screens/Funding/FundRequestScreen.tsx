import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, type TextInputProps } from 'react-native';
import React, { useState, type ReactNode } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object().shape({
  depositType: Yup.string()
    .required('Deposit Type is required'),
  transactionId: Yup.string()
    .required('Transaction ID is required')
    .min(5, 'Transaction ID must be at least 5 characters'),
  bankName: Yup.string()
    .required('Bank Name is required')
    .min(2, 'Bank Name must be at least 2 characters'),
  accountNo: Yup.string()
    .required('Account Number is required')
    .matches(/^[0-9]+$/, 'Account Number must contain only digits')
    .min(9, 'Account Number must be at least 9 digits')
    .max(18, 'Account Number must not exceed 18 digits'),
  holderName: Yup.string()
    .required('Account Holder Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),
  paymentMode: Yup.string()
    .required('Payment Mode is required'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(1, 'Amount must be at least 1'),
  confirmAmount: Yup.number()
    .required('Confirm Amount is required')
    .oneOf([Yup.ref('amount')], 'Amounts must match')
    .positive('Amount must be positive'),
  date: Yup.date()
    .required('Date is required')
    .nullable()
    .max(new Date(), 'Date cannot be in the future'),
  slip: Yup.mixed()
    .required('Deposit Slip is required'),
  narration: Yup.string()
    .required('Narration is required')
    .min(10, 'Narration must be at least 10 characters')
    .max(500, 'Narration must not exceed 500 characters'),
});

const DEPOSIT_TYPE_OPTIONS = ['Cash', 'Online'];
const PAYMENT_MODE_OPTIONS = ['IMPS', 'NEFT'];

type FundRequestValues = {
  depositType: string;
  transactionId: string;
  bankName: string;
  accountNo: string;
  holderName: string;
  paymentMode: string;
  amount: string;
  confirmAmount: string;
  date: Date | null;
  slip: { name: string } | null;
  narration: string;
};

type DropdownModalProps = {
  visible: boolean;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
};

function DropdownModal({ visible, options, onSelect, onClose }: DropdownModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} className="bg-white rounded-2xl p-0 w-[80%] shadow-lg">
          <View className="border-b border-gray-200 px-6 py-4">
            <Text className="text-gray-800 font-semibold text-lg">Select Option</Text>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className={`py-4 px-6 ${index !== options.length - 1 ? 'border-b border-gray-100' : ''}`}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text className="text-gray-700 text-base">{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            className="border-t border-gray-200 py-5 px-6"
            onPress={onClose}
          >
            <Text className="text-center text-red-500 font-semibold">Cancel</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

type FieldWrapperProps = {
  label: string;
  children: ReactNode;
  error?: string;
  helper?: ReactNode;
  space?: boolean;
};

const FieldWrapper = ({ label, children, error, helper, space = true }: FieldWrapperProps) => (
  <View className="mb-3">
    <Text className="text-gray-700 font-semibold mb-1">{label}</Text>
    {children}
    {helper}
    {error ? (
      <Text className="text-red-500 text-xs mt-1">{error}</Text>
    ) : (
      space && <View className="mb-3" />
    )}
  </View>
);

type FieldInputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
};

const FieldInput = ({ value, onChangeText, className, multiline = false, ...rest }: FieldInputProps) => {
  const baseClass = 'bg-gray-100 px-4 py-3 rounded-xl text-gray-800';
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      placeholderTextColor="#A0A0A0"
      className={`${className ? `${className} ` : ''}${baseClass}`}
      {...rest}
    />
  );
};

type SelectionFieldProps = {
  value?: string;
  placeholder: string;
  onPress: () => void;
  iconName: string;
  containerClassName?: string;
  accentColor?: string;
  activeOpacity?: number;
};

const SelectionField = ({
  value,
  placeholder,
  onPress,
  iconName,
  containerClassName,
  accentColor = '#555',
  activeOpacity = 0.8,
}: SelectionFieldProps) => (
  <TouchableOpacity
    activeOpacity={activeOpacity}
    className={`bg-gray-100 px-4 py-3 rounded-xl flex-row items-center justify-between ${containerClassName ?? ''}`}
    onPress={onPress}
  >
    {(() => {
      const hasValue = Boolean(value?.trim());
      return (
        <Text className={hasValue ? 'text-gray-800' : 'text-gray-400'}>
          {hasValue ? value : placeholder}
        </Text>
      );
    })()}
    <Icon name={iconName} size={24} color={accentColor} />
  </TouchableOpacity>
);

export default function FundRequestScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDepositTypeModal, setShowDepositTypeModal] = useState(false);
  const [showPaymentModeModal, setShowPaymentModeModal] = useState(false);

  const initialValues: FundRequestValues = {
    depositType: '',
    transactionId: '',
    bankName: '',
    accountNo: '',
    holderName: '',
    paymentMode: '',
    amount: '',
    confirmAmount: '',
    date: null,
    slip: null,
    narration: '',
  };

  const handleSubmit = (values: FundRequestValues, helpers: FormikHelpers<FundRequestValues>) => {
    console.log('Form submitted:', values);
    helpers.setSubmitting(false);
    // Add your submission logic here
  };

  return (
    <View className="flex-1 bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => {
          const getError = (field: keyof FundRequestValues) => (touched[field] ? errors[field] : undefined);
          return (
            <View>
              <KeyboardAwareScrollView
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 40 }}
              >
                <View className="p-5">
                  <View className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                    <FieldWrapper label="Deposit Type *" error={getError('depositType')}>
                      <SelectionField
                        value={values.depositType}
                        placeholder="Select Deposit Type"
                        onPress={() => {
                          setShowDepositTypeModal(true);
                          setFieldTouched('depositType', true);
                        }}
                        iconName="arrow-drop-down"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Transaction ID *" error={getError('transactionId')}>
                      <FieldInput
                        value={values.transactionId}
                        onChangeText={handleChange('transactionId')}
                        onBlur={handleBlur('transactionId')}
                        placeholder="Enter"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Bank Name *" error={getError('bankName')}>
                      <FieldInput
                        value={values.bankName}
                        onChangeText={handleChange('bankName')}
                        onBlur={handleBlur('bankName')}
                        placeholder="Enter"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Bank Account Number *" error={getError('accountNo')}>
                      <FieldInput
                        value={values.accountNo}
                        onChangeText={handleChange('accountNo')}
                        onBlur={handleBlur('accountNo')}
                        placeholder="Enter"
                        keyboardType="number-pad"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Bank Account Holder Name *" error={getError('holderName')}>
                      <FieldInput
                        value={values.holderName}
                        onChangeText={handleChange('holderName')}
                        onBlur={handleBlur('holderName')}
                        placeholder="Enter"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Payment Mode *" error={getError('paymentMode')}>
                      <SelectionField
                        value={values.paymentMode}
                        placeholder="Select Payment Mode"
                        onPress={() => {
                          setShowPaymentModeModal(true);
                          setFieldTouched('paymentMode', true);
                        }}
                        iconName="arrow-drop-down"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Amount *" error={getError('amount')}>
                      <FieldInput
                        value={values.amount}
                        onChangeText={handleChange('amount')}
                        onBlur={handleBlur('amount')}
                        placeholder="Enter"
                        keyboardType="numeric"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Confirm Amount *" error={getError('confirmAmount')}>
                      <FieldInput
                        value={values.confirmAmount}
                        onChangeText={handleChange('confirmAmount')}
                        onBlur={handleBlur('confirmAmount')}
                        placeholder="Enter"
                        keyboardType="numeric"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Select a Date *" error={getError('date')}>
                      <SelectionField
                        value={values.date ? values.date.toLocaleDateString('en-IN') : undefined}
                        placeholder="Choose Date"
                        onPress={() => {
                          setShowDatePicker(true);
                          setFieldTouched('date', true);
                        }}
                        iconName="date-range"
                      />
                    </FieldWrapper>

                    <DatePicker
                      modal
                      mode="date"
                      open={showDatePicker}
                      date={values.date ?? new Date()}
                      onConfirm={(selectedDate: Date) => {
                        setShowDatePicker(false);
                        setFieldValue('date', selectedDate);
                      }}
                      onCancel={() => setShowDatePicker(false)}
                    />

                    <FieldWrapper
                      label="Deposit Slip *"
                      error={getError('slip')}
                      helper={
                        <Text className="text-gray-400 text-xs mb-1">
                          PNG, JPEG, JPG, PDF files (max 1.5MB)
                        </Text>
                      }
                      space={false}
                    >
                      <SelectionField
                        value={values.slip?.name}
                        placeholder="No File Chosen"
                        onPress={() => {
                          setFieldTouched('slip', true);
                          // Add file picker logic here
                        }}
                        iconName="upload-file"
                        activeOpacity={0.9}
                        containerClassName="border border-gray-200 py-4"
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Narration *" error={getError('narration')}>
                      <FieldInput
                        value={values.narration}
                        onChangeText={handleChange('narration')}
                        onBlur={handleBlur('narration')}
                        placeholder="Enter"
                        multiline
                        numberOfLines={4}
                      />
                    </FieldWrapper>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      className="bg-red-500 rounded-xl py-3 px-6 mt-4 shadow-md"
                      onPress={() => handleSubmit()}
                    >
                      <Text className="text-white font-semibold text-center text-base">SUBMIT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAwareScrollView>

              <DropdownModal
                visible={showDepositTypeModal}
                options={DEPOSIT_TYPE_OPTIONS}
                onSelect={(value) => setFieldValue('depositType', value)}
                onClose={() => setShowDepositTypeModal(false)}
              />

              <DropdownModal
                visible={showPaymentModeModal}
                options={PAYMENT_MODE_OPTIONS}
                onSelect={(value) => setFieldValue('paymentMode', value)}
                onClose={() => setShowPaymentModeModal(false)}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
}