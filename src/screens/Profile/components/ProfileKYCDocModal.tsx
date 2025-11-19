// ProfileKYCDocModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DocCard from "./DocCard";

type Doc = {
  name: string;
  url?: string | null;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  documents: Doc[];
};

export default function ProfileKYCDocModal({
  visible,
  onClose,
  documents,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      {/* BACKDROP */}
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/40"
      />

      {/* BOTTOM SHEET */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-6 pb-10 px-7 max-h-[85%]">

        {/* HEADER */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-[22px] font-bold text-gray-900">
            KYC Documents
          </Text>

          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {/* SCROLL LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {documents.map((doc, i) => (
            <View key={i} className="mb-4">
              <DocCard doc={doc} />
            </View>
          ))}
        </ScrollView>

        {/* CLOSE BTN */}
       {/* <View className=" bg-white py-4 pt-2 absolute bottom-10 left-7 right-7">
       <TouchableOpacity
          onPress={onClose}
          className="bg-primary py-3.5 rounded-xl "
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-base font-semibold">
            Close
          </Text>
        </TouchableOpacity>
       </View> */}
      </View>
    </Modal>
  );
}
