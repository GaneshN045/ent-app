// File: @src/screens/Reports/commission_charges/components/TableFilterRow.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import type { TableData } from '../commission_charges/types';

interface TableFilterRowProps {
  visibleColumns: (keyof TableData)[];
}

const TableFilterRow: React.FC<TableFilterRowProps> = ({ visibleColumns }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (column: string, value: string) => {
    setFilters(prev => ({ ...prev, [column]: value }));
  };

  return (
    <View className="bg-gray-50 border-b border-gray-300">
      <View className="flex-row">
        {visibleColumns.map(col => (
          <View key={col} className="w-24 px-2 py-2 border-r border-gray-300">
            <TextInput
              placeholder={`Filter ${col}`}
              value={filters[col] || ''}
              onChangeText={value => handleFilterChange(col, value)}
              className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-700"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default TableFilterRow;
