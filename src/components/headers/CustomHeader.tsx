import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import SCREENS from '../../constants/screens';

const COMPANY_LOGO = require('../../assets/logos/im_logo_updated.png');
const SECOND_LOGO = require('../../assets/logos/im_logo.jpg');

export default function CustomHeader() {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 1,
        // paddingVertical: 8,
        paddingTop: 0,
        justifyContent: 'space-between',   // <-- THIS FIXES EVERYTHING
      }}
    >
      {/* LEFT: MENU + LOGOS */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        {/* Menu Button */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ padding: 8 }}
        >
          <MaterialIcons name="menu" size={28} color="#000" />
        </TouchableOpacity>

        {/* Logos */}
        <Image
          source={COMPANY_LOGO}
          style={{ width: 40, height: 50, marginLeft: 5 }}
          resizeMode="contain"
        />
        <Image
          source={SECOND_LOGO}
          style={{ width: 100, height: 30, marginLeft: 4 }}
          resizeMode="contain"
        />
      </View>

      {/* RIGHT: Notification Button */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CommonStack", { screen: SCREENS.NOTIFICATIONS_SCREEN })
        }
        style={{ padding: 8 }}
      >
        <MaterialIcons name="notifications" size={28} color="#666261" />
      </TouchableOpacity>
    </View>
  );
}
