import {
  Alert,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import COLORS from '../../constants/colors';
import { SuccessPopup } from '../../components/popups/SuccessPopupModal';
import { FailedPopup } from '../../components/popups/FailedPopupModal';

import { useUserId } from '../../hooks/useUserId';
import { useProfileData } from '../../hooks/useProfileData';
import { useSubProducts } from '../../hooks/useSubProducts';

import { useSendPayoutRequestMutation } from '../../services/api/fundApi';

type FormValues = {
  bankId: string;
  accountNumber: string;
  ifscCode: string;
  amount: string;
  confirmAmount: string;
  accountName: string;
  beneficiaryName: string;
  paymentMode: 'IMPS' | 'NEFT';
  subProductId: string;
};

const PAYMENT_MODES: FormValues['paymentMode'][] = ['IMPS', 'NEFT'];

const validationSchema = Yup.object().shape({
  amount: Yup.string()
    .required('Amount is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount')
    .test('positive', 'Amount must be greater than zero', value => {
      return value ? parseFloat(value) > 0 : false;
    }),
  confirmAmount: Yup.string()
    .required('Confirm amount is required')
    .test('match', 'Amounts must match', function (value) {
      return value === this.parent.amount;
    }),
  paymentMode: Yup.string()
    .oneOf(PAYMENT_MODES, 'Select a supported payment mode')
    .required('Payment mode is required'),
  bankId: Yup.string().required('Select a bank'),
});

const DEFAULT_SUB_PRODUCT = '34';

const INITIAL_VALUES: FormValues = {
  bankId: '',
  accountNumber: '',
  accountName: '',
  ifscCode: '',
  amount: '',
  confirmAmount: '',
  beneficiaryName: '',
  paymentMode: 'IMPS',
  subProductId: DEFAULT_SUB_PRODUCT,
};

const InputField = React.memo(
  ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    touched,
    keyboardType = 'default',
    editable = true,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
    touched?: boolean;
    keyboardType?: 'default' | 'numeric';
    editable?: boolean;
  }) => (
    <View className="mb-3">
      <Text className="text-sm text-primary_gray mb-1 font-semibold">{label} *</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        editable={editable}
        className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 text-primary_gray"
      />
      {touched && error ? <Text className="text-xs text-red-500 mt-1">{error}</Text> : null}
    </View>
  ),
);
InputField.displayName = 'InputField';

export default function WalletToBankScreen() {
  const { userId: retailerId } = useUserId();
  const [sendPayout, { isLoading }] = useSendPayoutRequestMutation();
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');
  const [showFailure, setShowFailure] = useState(false);

  const { profile, isLoading: profileLoading } = useProfileData();
  const { subProductId: mtbSubProductId } = useSubProducts('mtb');

  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);

  const handleSubmit = useCallback(
    async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      if (!retailerId) {
        Alert.alert('Missing Retailer ID', 'Please log in again to continue.');
        return;
      }

      const resolveMessage = (payload: unknown) => {
        if (!payload) {
          return undefined;
        }

        if (typeof payload === 'string') {
          try {
            const parsed = JSON.parse(payload);
            if (parsed?.message) {
              return parsed.message;
            }
          } catch {
            // ignore, use raw string below
          }
          return payload;
        }

        if (typeof payload === 'object') {
          return (payload as { message?: string }).message;
        }

        return undefined;
      };

      try {
        const response = await sendPayout({
          retailerId,
          accountNumber: values.accountNumber,
          ifscCode: values.ifscCode,
          amount: values.amount,
          beneficiaryName: values.beneficiaryName,
          paymentMode: values.paymentMode,
          subProductId: values.subProductId,
        }).unwrap();

        setSuccessMessage(response?.message || 'Payout request submitted successfully.');
        setShowSuccess(true);
        resetForm();
        setShowFailure(false);
        setFailureMessage('');
      } catch (error: any) {
        const errorMessage =
          resolveMessage(error?.data) ||
          resolveMessage(error?.error) ||
          error?.message ||
          'Request failed. Try again.';
        setFailureMessage(errorMessage);
        setShowFailure(true);
      }
    },
    [retailerId, sendPayout],
  );

  const handleSuccessClose = useCallback(() => setShowSuccess(false), []);
  const handleFailureClose = useCallback(() => {
    setShowFailure(false);
    setFailureMessage('');
  }, []);

  const banks = profile?.myBanksList ?? [];
  const maskedBanks = useMemo(
    () =>
      banks.map(bank => ({
        value: bank.id.toString(),
        label: `${bank.bankName} • ${bank.accountNo.slice(-4)}`,
        accountNumber: bank.accountNo,
        ifscCode: bank.ifcscode,
        accountName: bank.accountName,
      })),
    [banks],
  );

  const derivedInitialValues = useMemo(() => {
    const defaultBank = maskedBanks[0];
    return {
      ...INITIAL_VALUES,
      bankId: defaultBank?.value ?? '',
      accountNumber: defaultBank?.accountNumber ?? '',
      ifscCode: defaultBank?.ifscCode ?? '',
      beneficiaryName: defaultBank?.accountName ?? '',
      subProductId: mtbSubProductId ?? INITIAL_VALUES.subProductId,
    };
  }, [maskedBanks, mtbSubProductId]);

  return (
    <ScrollView
      className="flex-1 bg-[#F7F7F9]"
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-white rounded-3xl px-5 py-6 shadow-sm border border-[#ECECF1]">
        {retailerId ? (
          <Text className="text-xs text-gray-500 mb-4">Retailer ID: {retailerId}</Text>
        ) : (
          <Text className="text-xs text-red-500 mb-4">Retailer ID unavailable</Text>
        )}

        <Formik
          enableReinitialize
          initialValues={derivedInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
            const selectedBank = maskedBanks.find(bank => bank.value === values.bankId);
            return (
              <>
                {/* 1. Wallet Type */}
                <View className="mb-3">
                  <Text className="text-sm text-primary_gray mb-1 font-semibold">Wallet Type</Text>
                  <View className="px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50">
                    <Text className="text-primary_gray font-semibold">POSTPAID</Text>
                  </View>
                </View>

                {/* 2. Select Bank */}
                <View className="mb-3">
                  <Text className="text-sm text-primary_gray mb-1 font-semibold">
                    Select Bank *
                  </Text>
                  <TouchableOpacity
                    onPress={() => setBankDropdownOpen(prev => !prev)}
                    className="px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 flex-row justify-between items-center"
                  >
                    <Text className="text-primary_gray">
                      {selectedBank?.label ??
                        (profileLoading ? 'Loading banks...' : 'Select a bank')}
                    </Text>
                    <Icon
                      name={bankDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                      size={24}
                      color="#8B8F9B"
                    />
                  </TouchableOpacity>
                  {bankDropdownOpen && (
                    <View className="mt-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
                      {maskedBanks.map(bank => (
                        <TouchableOpacity
                          key={bank.value}
                          className="px-4 py-3 border-b last:border-b-0"
                          onPress={() => {
                            setFieldValue('bankId', bank.value);
                            setFieldValue('accountNumber', bank.accountNumber);
                            setFieldValue('ifscCode', bank.ifscCode);
                            setFieldValue('beneficiaryName', bank.accountName);
                            setBankDropdownOpen(false);
                          }}
                        >
                          <Text className="text-primary_gray">{bank.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {touched.bankId && errors.bankId ? (
                    <Text className="text-xs text-red-500 mt-1">{errors.bankId}</Text>
                  ) : null}
                </View>

                {/* 3. Amount */}
                <InputField
                  label="Amount (₹)"
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  placeholder="Enter amount"
                  error={errors.amount}
                  touched={Boolean(touched.amount)}
                  keyboardType="numeric"
                />

                {/* 4. Confirm Amount */}
                <InputField
                  label="Confirm Amount (₹)"
                  value={values.confirmAmount}
                  onChangeText={handleChange('confirmAmount')}
                  placeholder="Re-enter amount"
                  error={errors.confirmAmount}
                  touched={Boolean(touched.confirmAmount)}
                  keyboardType="numeric"
                />

                {/* 5. Payment Mode */}
                <View className="mb-3">
                  <Text className="text-sm text-primary_gray mb-1 font-semibold">
                    Payment Mode *
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {PAYMENT_MODES.map(mode => {
                      const selected = values.paymentMode === mode;
                      return (
                        <TouchableOpacity
                          key={mode}
                          onPress={() => setFieldValue('paymentMode', mode)}
                          className="px-4 mt-4 py-2 rounded-xl border"
                          style={{
                            borderColor: selected ? COLORS.PRIMARY_COLOR : '#E5E7EB',
                            backgroundColor: selected ? COLORS.PRIMARY_COLOR : '#F9FAFB',
                          }}
                        >
                          <Text
                            className="text-sm font-semibold"
                            style={{ color: selected ? '#fff' : COLORS.PRIMARY_COLOR }}
                          >
                            {mode}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {touched.paymentMode && errors.paymentMode ? (
                    <Text className="text-xs text-red-500 mt-1">{errors.paymentMode}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  activeOpacity={0.85}
                  className="rounded-2xl bg-white border border-primary py-4 flex-row items-center justify-center mt-4 shadow-md"
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                >
                  {isLoading && <ActivityIndicator color={COLORS.PRIMARY_COLOR} style={{ marginRight: 8 }} />}
                  <Icon name="send" size={20} color={COLORS.PRIMARY_COLOR} />
                  <Text className="text-primary font-semibold text-base ml-2">Request Payout</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>

      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        onRequestClose={handleSuccessClose}
        onPrimaryPress={handleSuccessClose}
        primaryLabel="Continue"
      />
      <FailedPopup
        visible={showFailure}
        message={failureMessage || 'Request failed. Try again.'}
        onRequestClose={handleFailureClose}
        onPrimaryPress={handleFailureClose}
        primaryLabel="Retry"
      />
    </ScrollView>
  );
}
