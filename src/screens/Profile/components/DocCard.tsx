import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Doc = {
  name: string;
  url?: string | null;
};

export default function DocCard({ doc }: { doc: Doc }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hasUrl = doc.url && doc.url.startsWith('http');

  // Valid ONLY when URL exists & image has loaded successfully
  const isValid = hasUrl && !error;

  return (
    <View className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      {/* TITLE */}
      <Text className="text-[17px] font-bold text-gray-900 mb-4 tracking-wide">{doc.name}</Text>

      {/* IMAGE / ERROR CONTAINER */}
      <View className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden justify-center items-center">
        {/* LOADING SPINNER (only when image is loading) */}
        {loading && <ActivityIndicator size="large" color="#888" />}

        {/* IMAGE */}
        {hasUrl && (
          <Image
            source={{ uri: doc.url! }}
            className="w-full h-full"
            resizeMode="cover"
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        )}

        {/* ERROR (ONLY if load finished + error happened) */}
        {!loading && !isValid && (
          <View className="flex-col justify-center items-center px-4 absolute">
            <MaterialIcons name="broken-image" size={42} color="#b91c1c" />
            <Text className="text-red-700 font-semibold text-sm text-center mt-2">
              Invalid or Unreachable Document URL
            </Text>
          </View>
        )}
      </View>

      {/* STATUS */}
      <View className="flex-row items-center mt-4">
        {isValid ? (
          <View className="bg-green-100 px-3 py-1.5 rounded-full flex-row items-center">
            <MaterialIcons name="check-circle" size={16} color="#0d7a00" />
            <Text className="text-green-800 ml-1 font-semibold text-xs">Verified</Text>
          </View>
        ) : !loading ? (
          <View className="bg-red-100 px-3 py-1.5 rounded-full flex-row items-center">
            <MaterialIcons name="error-outline" size={16} color="#b91c1c" />
            <Text className="text-red-800 ml-1 font-semibold text-xs">Unverified</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
