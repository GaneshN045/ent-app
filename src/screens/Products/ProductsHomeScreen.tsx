import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import '../../../global.css';

import SCREENS from '../../constants/screens';
import HomeScreenButton from '../../components/buttons/HomeScreenButton';
import ModalOptionButton from '../../components/buttons/ModalOptionButton';

type ProductOption = {
  label: string;
  option_type: string;
  icon: string;
  screen: keyof typeof SCREENS;
};

type ProductFlowItem =
  | {
      type: 'direct';
      screen: keyof typeof SCREENS;
    }
  | {
      type: 'modal';
      title: string;
      options: ProductOption[];
    };

const productFlowConfig: Record<string, ProductFlowItem> = {
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
    title: 'Select AEPS Vendor',
    options: [], // filled later from AEPS_OPTIONS
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

type AepsVendorType = 'AEPS1' | 'AEPS2' | 'AEPS3' | 'AEPS4' | 'AEPS5' | 'AEPS6';

type AepsVendorOption = {
  label: AepsVendorType;
  icon: string;
};

const AEPS_OPTIONS: AepsVendorOption[] = [
  { label: 'AEPS1', icon: 'fingerprint' },
  { label: 'AEPS2', icon: 'fingerprint' },
  { label: 'AEPS3', icon: 'fingerprint' },
  { label: 'AEPS4', icon: 'fingerprint' },
  { label: 'AEPS5', icon: 'fingerprint' },
  { label: 'AEPS6', icon: 'fingerprint' },
];

// Inject AEPS vendor options into productFlowConfig
const aepsFlow = productFlowConfig.AEPS as Extract<ProductFlowItem, { type: 'modal' }>;
aepsFlow.options = AEPS_OPTIONS.map<ProductOption>(opt => ({
  label: opt.label,
  option_type: opt.label,
  icon: opt.icon,
  screen: SCREENS.AEPS_OPTION_SELECTION,
}));

type NavProp = {
  navigate: (screen: keyof typeof SCREENS, params?: any) => void;
};

export default function ProductsHomeScreen() {
  const navigation = useNavigation<NavProp>();

  const [modalData, setModalData] = useState<Extract<ProductFlowItem, { type: 'modal' }> | null>(
    null,
  );

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

  const handleModalOptionPress = (option: ProductOption) => {
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
