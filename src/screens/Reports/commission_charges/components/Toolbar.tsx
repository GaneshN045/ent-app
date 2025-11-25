// File: @src/screens/Reports/commission_charges/components/Toolbar.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import type { TableData } from '../types';

interface ToolbarProps {
  onRefresh: () => void;
  onExport: () => void;
  onToggleFilters: () => void;
  onToggleColumns: (column: keyof TableData) => void;
  onToggleAllColumns: () => void;
  visibleColumns: Record<keyof TableData, boolean>;
  columns: (keyof TableData)[];
}

const Toolbar: React.FC<ToolbarProps> = ({
  onRefresh,
  onExport,
  onToggleFilters,
  onToggleColumns,
  onToggleAllColumns,
  visibleColumns,
  columns,
}) => {
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  return (
    <View className="bg-white border-b border-gray-200">
      <View className="flex-row items-center justify-between px-4 py-3 gap-2">
        {/* Refresh Button */}
        <TouchableOpacity
          onPress={onRefresh}
          className="px-3 py-2 bg-gray-100 rounded-lg active:bg-gray-200"
        >
          <Text className="text-sm font-semibold text-gray-700">🔄 Refresh</Text>
        </TouchableOpacity>

        {/* Export Button */}
        <TouchableOpacity
          onPress={onExport}
          className="px-3 py-2 bg-green-100 rounded-lg active:bg-green-200"
        >
          <Text className="text-sm font-semibold text-green-700">📥 Export</Text>
        </TouchableOpacity>

        {/* Filter Toggle */}
        <TouchableOpacity
          onPress={onToggleFilters}
          className="px-3 py-2 bg-blue-100 rounded-lg active:bg-blue-200"
        >
          <Text className="text-sm font-semibold text-blue-700">⚙️ Filters</Text>
        </TouchableOpacity>

        {/* Columns Menu */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => setShowColumnMenu(!showColumnMenu)}
            className="px-3 py-2 bg-purple-100 rounded-lg active:bg-purple-200"
          >
            <Text className="text-sm font-semibold text-purple-700">👁️ Columns</Text>
          </TouchableOpacity>

          {showColumnMenu && (
            <View className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <TouchableOpacity
                onPress={onToggleAllColumns}
                className="px-4 py-2 border-b border-gray-200"
              >
                <Text className="font-semibold text-gray-800">Toggle All</Text>
              </TouchableOpacity>
              {columns.map(col => (
                <TouchableOpacity
                  key={col}
                  onPress={() => {
                    onToggleColumns(col);
                    setShowColumnMenu(false);
                  }}
                  className="px-4 py-2 flex-row items-center justify-between"
                >
                  <Text className="text-gray-700 capitalize">{col}</Text>
                  <Text>{visibleColumns[col] ? '✓' : '○'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Toolbar;
