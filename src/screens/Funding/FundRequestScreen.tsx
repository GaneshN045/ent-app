import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object().shape({
  depositType: Yup.string()
    .required('Deposit Type is required')
    .min(2, 'Deposit Type must be at least 2 characters'),
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

export default function FundRequestScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    console.log('Form submitted:', values);
    // Add your submission logic here
  };

  return (
    <View className="flex-1 bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
          <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View className="p-5">
              <View className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                
                {/* Deposit Type */}
                <Text className="text-gray-700 font-semibold mb-1">Deposit Type *</Text>
                <TextInput
                  value={values.depositType}
                  onChangeText={handleChange('depositType')}
                  onBlur={handleBlur('depositType')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.depositType && errors.depositType && (
                  <Text className="text-red-500 text-xs mb-3">{errors.depositType}</Text>
                )}
                {!errors.depositType && <View className="mb-3" />}

                {/* Transaction ID */}
                <Text className="text-gray-700 font-semibold mb-1">Transaction ID *</Text>
                <TextInput
                  value={values.transactionId}
                  onChangeText={handleChange('transactionId')}
                  onBlur={handleBlur('transactionId')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.transactionId && errors.transactionId && (
                  <Text className="text-red-500 text-xs mb-3">{errors.transactionId}</Text>
                )}
                {!errors.transactionId && <View className="mb-3" />}

                {/* Bank Name */}
                <Text className="text-gray-700 font-semibold mb-1">Bank Name *</Text>
                <TextInput
                  value={values.bankName}
                  onChangeText={handleChange('bankName')}
                  onBlur={handleBlur('bankName')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.bankName && errors.bankName && (
                  <Text className="text-red-500 text-xs mb-3">{errors.bankName}</Text>
                )}
                {!errors.bankName && <View className="mb-3" />}

                {/* Account Number */}
                <Text className="text-gray-700 font-semibold mb-1">Bank Account Number *</Text>
                <TextInput
                  value={values.accountNo}
                  onChangeText={handleChange('accountNo')}
                  onBlur={handleBlur('accountNo')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="number-pad"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.accountNo && errors.accountNo && (
                  <Text className="text-red-500 text-xs mb-3">{errors.accountNo}</Text>
                )}
                {!errors.accountNo && <View className="mb-3" />}

                {/* Holder Name */}
                <Text className="text-gray-700 font-semibold mb-1">Bank Account Holder Name *</Text>
                <TextInput
                  value={values.holderName}
                  onChangeText={handleChange('holderName')}
                  onBlur={handleBlur('holderName')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.holderName && errors.holderName && (
                  <Text className="text-red-500 text-xs mb-3">{errors.holderName}</Text>
                )}
                {!errors.holderName && <View className="mb-3" />}

                {/* Payment Mode */}
                <Text className="text-gray-700 font-semibold mb-1">Payment Mode *</Text>
                <TextInput
                  value={values.paymentMode}
                  onChangeText={handleChange('paymentMode')}
                  onBlur={handleBlur('paymentMode')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.paymentMode && errors.paymentMode && (
                  <Text className="text-red-500 text-xs mb-3">{errors.paymentMode}</Text>
                )}
                {!errors.paymentMode && <View className="mb-3" />}

                {/* Amount */}
                <Text className="text-gray-700 font-semibold mb-1">Amount *</Text>
                <TextInput
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="numeric"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.amount && errors.amount && (
                  <Text className="text-red-500 text-xs mb-3">{errors.amount}</Text>
                )}
                {!errors.amount && <View className="mb-3" />}

                {/* Confirm Amount */}
                <Text className="text-gray-700 font-semibold mb-1">Confirm Amount *</Text>
                <TextInput
                  value={values.confirmAmount}
                  onChangeText={handleChange('confirmAmount')}
                  onBlur={handleBlur('confirmAmount')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="numeric"
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                />
                {touched.confirmAmount && errors.confirmAmount && (
                  <Text className="text-red-500 text-xs mb-3">{errors.confirmAmount}</Text>
                )}
                {!errors.confirmAmount && <View className="mb-3" />}

                {/* Select Date */}
                <Text className="text-gray-700 font-semibold mb-1">Select a Date *</Text>
                <TouchableOpacity
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 flex-row items-center justify-between"
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowDatePicker(true);
                    setFieldTouched('date', true);
                  }}
                >
                  <Text className="text-gray-600">
                    {values.date ? values.date.toLocaleDateString('en-IN') : 'Choose Date'}
                  </Text>
                  <Icon name="date-range" size={24} color="#555" />
                </TouchableOpacity>
                {touched.date && errors.date && (
                  <Text className="text-red-500 text-xs mb-3">{errors.date}</Text>
                )}
                {!errors.date && <View className="mb-3" />}

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

                {/* Deposit Slip Upload */}
                <Text className="text-gray-700 font-semibold mb-2">Deposit Slip *</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="bg-gray-100 px-4 py-4 rounded-xl border border-gray-200 flex-row justify-between items-center mb-1"
                  onPress={() => {
                    // Add file picker logic here
                    setFieldTouched('slip', true);
                  }}
                >
                  <Text className="text-gray-600">
                    {values.slip ? values.slip.name : 'No File Chosen'}
                  </Text>
                  <Icon name="upload-file" size={24} color="#555" />
                </TouchableOpacity>
                <Text className="text-gray-400 text-xs mb-1">
                  PNG, JPEG, JPG, PDF files (max 1.5MB)
                </Text>
                {touched.slip && errors.slip && (
                  <Text className="text-red-500 text-xs mb-3">{errors.slip}</Text>
                )}
                {!errors.slip && <View className="mb-3" />}

                {/* Narration */}
                <Text className="text-gray-700 font-semibold mb-1">Narration *</Text>
                <TextInput
                  value={values.narration}
                  onChangeText={handleChange('narration')}
                  onBlur={handleBlur('narration')}
                  placeholder="Enter"
                  placeholderTextColor="#A0A0A0"
                  multiline
                  numberOfLines={4}
                  className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
                  textAlignVertical="top"
                />
                {touched.narration && errors.narration && (
                  <Text className="text-red-500 text-xs mb-3">{errors.narration}</Text>
                )}
                {!errors.narration && <View className="mb-3" />}

                {/* Submit Button */}
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
        )}
      </Formik>
    </View>
  );
}