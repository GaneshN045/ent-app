// File: @src/screens/Reports/commission_charges/components/ShimmerTableRows.tsx
import React from 'react';
import { View } from 'react-native';

interface TableRowsSkeletonProps {
  count: number;
}

const TableRowsSkeleton: React.FC<TableRowsSkeletonProps> = ({ count }) => {
  return (
    <View className="bg-white rounded-lg overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} className="flex-row bg-white border-b border-gray-200 p-4">
          <View className="flex-1 h-4 bg-gray-300 rounded mb-2" />
          <View className="flex-1 h-4 bg-gray-300 rounded mb-2 ml-2" />
          <View className="flex-1 h-4 bg-gray-300 rounded mb-2 ml-2" />
          <View className="flex-1 h-4 bg-gray-300 rounded mb-2 ml-2" />
        </View>
      ))}
    </View>
  );
};

export default TableRowsSkeleton;
