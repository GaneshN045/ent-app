import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserId } from '../../hooks/useUserId';
import { useWalletToWalletTransferMutation } from '../../services/api/fundApi';
import { useGetWalletBalanceQuery } from '../../services/api/profileApi';
import COLORS from '../../constants/colors';
import SCREENS from '../../constants/screens';
import { FundingStackParamList } from '../../navigation/types';
import { SuccessPopup, type SuccessPopupProps } from '../../components/popups/SuccessPopupModal';
import { FailedPopup } from '../../components/popups/FailedPopupModal';

// Types
type WalletType = 'PREPAID' | 'POSTPAID';

interface FormValues {
  walletFrom: WalletType;
  walletTo: WalletType;
  amount: string;
  confirmAmount: string;
}

// Validation Schema (memoized outside component)
const validationSchema = Yup.object().shape({
  walletFrom: Yup.string()
    .oneOf(['PREPAID', 'POSTPAID'], 'Wallet type must be PREPAID or POSTPAID')
    .required('Wallet From is required'),
  walletTo: Yup.string()
    .oneOf(['PREPAID', 'POSTPAID'], 'Wallet type must be PREPAID or POSTPAID')
    .required('Wallet To is required')
    .test('different-wallet', 'Source and destination wallets must be different', function (value) {
      return value !== this.parent.walletFrom;
    }),
  amount: Yup.number()
    .typeError('Amount must be a valid number')
    .positive('Amount must be greater than zero')
    .required('Transfer amount is required'),
  confirmAmount: Yup.number()
    .typeError('Confirm amount must be a valid number')
    .positive('Confirm amount must be greater than zero')
    .required('Confirm amount is required')
    .oneOf([Yup.ref('amount')], 'Transfer amount and confirmation must match'),
});

// Initial values (memoized outside component)
const INITIAL_VALUES: FormValues = {
  walletFrom: 'PREPAID',
  walletTo: 'POSTPAID',
  amount: '',
  confirmAmount: '',
};

// Extracted Components
interface WalletCardProps {
  label: string;
  badgeText: string;
  walletType: WalletType;
}

const WalletCard = React.memo(({ label, badgeText, walletType }: WalletCardProps) => (
  <View className="rounded-xl p-4 bg-gray-100">
    <View className="flex-row items-center justify-between mb-2">
      <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</Text>
      <View className="px-2 py-1 rounded-md bg-gray-200">
        <Text className="text-xs font-semibold" style={{ color: COLORS.PRIMARY_COLOR }}>
          {badgeText}
        </Text>
      </View>
    </View>
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full items-center justify-center mr-3 bg-gray-200">
          <Icon name="account-balance-wallet" size={20} color={COLORS.GRAY_ICON} />
        </View>
        <Text className="text-xl font-bold text-gray-800">{walletType}</Text>
      </View>
    </View>
  </View>
));

WalletCard.displayName = 'WalletCard';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string;
  touched?: boolean;
}

const InputField = React.memo(
  ({ label, value, onChangeText, onBlur, error, touched }: InputFieldProps) => (
    <View>
      <Text className="text-gray-700 font-semibold mb-1">{label} *</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder="Enter"
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
        className="bg-gray-100 px-4 py-3 rounded-xl mb-1 text-gray-800"
      />
      {touched && error && <Text className="text-sm text-red-600 mb-3">{error}</Text>}
      <View className="mb-3" />
    </View>
  ),
);

InputField.displayName = 'InputField';

// Main Component
export default function WalletToWalletScreen() {
  const { userId: hierarchyId } = useUserId();
  const navigation =
    useNavigation<
      StackNavigationProp<FundingStackParamList, typeof SCREENS.WALLET_TO_WALLET_SCREEN>
    >();

  const [triggerTransfer, { isLoading: isSubmitting }] = useWalletToWalletTransferMutation();

  const { refetch: refetchWalletBalance } = useGetWalletBalanceQuery(hierarchyId ?? '', {
    skip: !hierarchyId,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showFailure, setShowFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');

  const resolveMessage = (payload: unknown) => {
    if (!payload) return undefined;
    if (typeof payload === 'string') {
      try {
        const parsed = JSON.parse(payload);
        if (parsed?.message) return parsed.message;
      } catch {
        // fallback to raw string
      }
      return payload;
    }
    if (typeof payload === 'object') {
      return (payload as { message?: string }).message;
    }
    return undefined;
  };

  const handleSubmit = useCallback(
    async (values: FormValues, { setFieldError, resetForm }: FormikHelpers<FormValues>) => {
      if (!hierarchyId) {
        Alert.alert('Error', 'Unable to determine member ID. Please log in again.');
        return;
      }

      try {
        const response = await triggerTransfer({
          hierarchyId,
          walletTypeFrom: values.walletFrom,
          walletTypeTo: values.walletTo,
          transferAmount: values.amount,
          confirmAmount: values.confirmAmount,
        }).unwrap();

        resetForm();
        refetchWalletBalance?.();
        setSuccessMessage(response?.message || 'Transfer requested successfully.');
        setShowSuccess(true);
        setShowFailure(false);
        setFailureMessage('');
      } catch (error: any) {
        const errorMessage =
          resolveMessage(error?.data) ||
          resolveMessage(error?.error) ||
          error?.message ||
          'Transfer failed. Please try again.';
        setFailureMessage(errorMessage);
        setShowFailure(true);
      }
    },
    [hierarchyId, triggerTransfer, refetchWalletBalance],
  );

  const handleSuccessClose = useCallback(() => {
    setShowSuccess(false);
    navigation.navigate(SCREENS.FUNDING_HOME_SCREEN);
  }, [navigation]);

  const handleFailureClose = useCallback(() => {
    setShowFailure(false);
    setFailureMessage('');
  }, []);

  const toggleWallets = useCallback(
    (
      setFieldValue: (field: string, value: any) => void,
      currentFrom: WalletType,
      currentTo: WalletType,
    ) => {
      setFieldValue('walletFrom', currentTo);
      setFieldValue('walletTo', currentFrom);
    },
    [],
  );

  const scrollViewContentStyle = useMemo(() => ({ paddingBottom: 40 }), []);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={scrollViewContentStyle}
      >
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <View className="p-5">
              <View className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                {/* Wallet Transfer Visual */}
                <View className="mb-6">
                  <WalletCard
                    label="Transfer From"
                    badgeText="Source"
                    walletType={values.walletFrom}
                  />

                  {/* Swap Button */}
                  <View className="items-center my-1 mt-4 z-10">
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() =>
                        toggleWallets(setFieldValue, values.walletFrom, values.walletTo)
                      }
                      className="flex-row items-center justify-center rounded-full px-5 h-12 shadow-lg"
                      style={{
                        backgroundColor: COLORS.PRIMARY_COLOR,
                        elevation: 7,
                      }}
                    >
                      <Text className="text-white font-semibold mr-2">Swap</Text>
                      <Icon name="swap-vert" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <View className="mt-3">
                    <WalletCard
                      label="Transfer To"
                      badgeText="Destination"
                      walletType={values.walletTo}
                    />
                  </View>

                  {/* Wallet Validation Error */}
                  {((touched.walletFrom && errors.walletFrom) ||
                    (touched.walletTo && errors.walletTo)) && (
                    <View className="mt-3 bg-red-50 rounded-lg p-2.5 border border-red-100">
                      <Text className="text-xs text-red-600">
                        {errors.walletFrom || errors.walletTo}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Divider */}
                <View className="h-px bg-gray-200 my-5" />

                {/* Input Fields */}
                <InputField
                  label="Transfer Amount"
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  error={errors.amount}
                  touched={touched.amount}
                />

                <InputField
                  label="Confirm Amount"
                  value={values.confirmAmount}
                  onChangeText={handleChange('confirmAmount')}
                  onBlur={handleBlur('confirmAmount')}
                  error={errors.confirmAmount}
                  touched={touched.confirmAmount}
                />

                {/* Submit Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  className="rounded-2xl py-4 flex-row items-center justify-center shadow-md"
                  style={{ backgroundColor: COLORS.PRIMARY_COLOR }}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <ActivityIndicator color="#FFF" style={{ marginRight: 8 }} />}
                  <Icon name="send" size={20} color="#FFF" />
                  <Text className="text-white font-semibold text-base ml-2">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        primaryLabel="Go to Funding"
        onPrimaryPress={handleSuccessClose}
        onRequestClose={handleSuccessClose}
      />
      <FailedPopup
        visible={showFailure}
        message={failureMessage || 'Transfer failed. Please try again.'}
        onRequestClose={handleFailureClose}
        onPrimaryPress={handleFailureClose}
      />
    </View>
  );
}
