import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import '../../../global.css';

import SCREENS from '../../constants/screens';
import HomeScreenButton from '../../components/buttons/HomeScreenButton';
import ModalOptionButton from '../../components/buttons/ModalOptionButton';

const productFlowConfig: any = {
  'Payment Gateway': {
    type: 'modal',
    title: 'Select Payment Gateway',
    options: [
      { label: 'PG10', option_type: 'PG_10', icon: 'bolt', screen: SCREENS.PG_SCREEN },
      { label: 'PG9', option_type: 'PG_9', icon: 'rocket-launch', screen: SCREENS.PG_SCREEN },
      { label: 'PG8', option_type: 'PG_8', icon: 'speed', screen: SCREENS.PG_SCREEN },
    ],
  },

  Payout: {
    type: 'modal',
    title: 'Select Payout',
    options: [
      {
        label: 'Payout 1',
        option_type: 'PAYOUT_1',
        icon: 'account-balance',
        screen: SCREENS.PAYOUT_SCREEN,
      },
      {
        label: 'Payout 11',
        option_type: 'PAYOUT_11',
        icon: 'payments',
        screen: SCREENS.PAYOUT_SCREEN,
      },
    ],
  },

  DMT: {
    type: 'modal',
    title: 'Select DMT Service',
    options: [
      {
        label: 'DMT',
        option_type: 'DMT_PAYSPRINT',
        icon: 'swap-horiz',
        screen: SCREENS.DMT_SCREEN,
      },
    ],
  },

  MPOS: {
    type: 'direct',
    screen: SCREENS.MPOS_SCREEN,
  },

  AEPS: {
    type: 'modal',
    title: 'Select AEPS Service',
    options: [
      {
        label: 'Cash Withdrawal',
        option_type: 'AEPS_CASH_WITHDRAWAL',
        icon: 'money',
        screen: SCREENS.AEPS_OPTION_SELECTION,
      },
      {
        label: 'Balance Enquiry',
        option_type: 'AEPS_BALANCE_ENQUIRY',
        icon: 'account-balance-wallet',
        screen: SCREENS.AEPS_OPTION_SELECTION,
      },
      {
        label: 'Mini Statement',
        option_type: 'AEPS_MINI_STATEMENT',
        icon: 'list-alt',
        screen: SCREENS.AEPS_OPTION_SELECTION,
      },
    ],
  },

  'Bill Payment': {
    type: 'modal',
    title: 'Select Bill Payment',
    options: [
      {
        label: 'BBPS1',
        option_type: 'BBPS_1',
        icon: 'receipt',
        screen: SCREENS.BILL_PAYMENT_SCREEN,
      },
      {
        label: 'BBPS2',
        option_type: 'BBPS_2',
        icon: 'receipt',
        screen: SCREENS.BILL_PAYMENT_SCREEN,
      },
    ],
  },
};

const iconsMap: any = {
  'Payment Gateway': 'payment',
  Payout: 'account-balance-wallet',
  DMT: 'send-to-mobile',
  MPOS: 'point-of-sale',
  AEPS: 'fingerprint',
  'Bill Payment': 'receipt',
};

const productTitles = Object.keys(productFlowConfig);

type NavProp = {
  navigate: (screen: keyof typeof SCREENS, params?: any) => void;
};

export default function ProductsHomeScreen() {
  const navigation = useNavigation<NavProp>();

  const [modalData, setModalData] = useState<any>(null);

  const handleProductPress = (title: string) => {
    const flow = productFlowConfig[title];

    if (flow.type === 'direct') {
      navigation.navigate(flow.screen);
      return;
    }

    if (flow.type === 'modal') {
      setModalData({ ...flow });
    }
  };

  const handleModalOptionPress = (option: any) => {
    setModalData(null);
    navigation.navigate(option.screen, {
      option_type: option.option_type,
    });
  };

  return (
    <View className="flex-1 bg-[#F7F8FA] px-5 pt-6">
      <Text className="text-2xl font-bold text-[#34343A] mb-5">Products</Text>

      {/* Product Buttons */}
      <View className="flex-row flex-wrap justify-between">
        {productTitles.map((title, i) => (
          <HomeScreenButton
            key={i}
            title={title}
            subtitle={`Explore ${title}`}
            icon={iconsMap[title]}
            onPress={() => handleProductPress(title)}
          />
        ))}
      </View>

      {/* Dynamic Modal */}
      <Modal
        visible={!!modalData}
        animationType="fade"
        transparent
        statusBarTranslucent={true}
        onRequestClose={() => setModalData(null)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalData(null)}
          className="flex-1 bg-black/40 justify-center items-center px-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}
            className="w-full bg-white rounded-2xl p-6"
          >
            {modalData && (
              <>
                <Text className="text-xl font-bold text-gray-900 mb-5">{modalData.title}</Text>

                {modalData.options.map((opt: any, index: number) => (
                  <ModalOptionButton
                    key={index}
                    title={opt.label}
                    icon={opt.icon}
                    onPress={() => handleModalOptionPress(opt)}
                  />
                ))}

                <TouchableOpacity
                  className="mt-5 p-3 bg-gray-200 rounded-xl"
                  onPress={() => setModalData(null)}
                >
                  <Text className="text-center font-semibold text-gray-700">Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
