// File: @src/screens/Reports/commission_charges/components/GenericMasterTable.tsx
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import TableFilterRow from './TableFilterRow';
import type { TableData } from '../types';

interface GenericMasterTableProps {
  data: TableData[];
  columns: (keyof TableData)[];
  visibleColumns: Record<keyof TableData, boolean>;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showFilters: boolean;
  columnFilters?: Record<string, string>;
  onColumnFilterChange?: (column: string, value: string) => void;
}

const GenericMasterTable: React.FC<GenericMasterTableProps> = ({
  data,
  columns,
  visibleColumns,
  currentPage,
  itemsPerPage,
  onPageChange,
  showFilters,
  columnFilters = {},
  onColumnFilterChange = () => {},
}) => {
  const activeColumns = columns.filter(col => visibleColumns[col]);
  const screenWidth = Dimensions.get('window').width;

  // Calculate column widths dynamically
  const columnWidths = useMemo(() => {
    const minWidth = 120;
    const totalColumns = activeColumns.length;
    const availableWidth = Math.max(screenWidth - 40, totalColumns * minWidth);
    const columnWidth = Math.max(minWidth, availableWidth / totalColumns);
    return activeColumns.map(() => columnWidth);
  }, [activeColumns, screenWidth]);

  const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    const strValue = String(value);
    return strValue.length > 25 ? strValue.substring(0, 22) + '...' : strValue;
  };

  return (
    <View className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Info Banner */}
      {activeColumns.length > 8 && (
        <View className="bg-blue-50 px-4 py-2 border-b border-blue-200">
          <Text className="text-xs text-blue-700 font-medium">
            📊 Columns: {activeColumns.length} • Scroll right to see more
          </Text>
        </View>
      )}

      {/* Horizontal Scroll Container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      >
        <View style={{ width: tableWidth }}>
          {/* Header Row */}
          <View className="bg-gray-100 border-b border-gray-300">
            <View className="flex-row">
              {activeColumns.map((col, idx) => (
                <View
                  key={col}
                  style={{ width: columnWidths[idx] }}
                  className="border-r border-gray-300 justify-center px-2 py-3"
                >
                  <Text className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    {String(col)
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase())
                      .trim()}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Filter Row */}
          {showFilters && (
            <View className="bg-gray-50 border-b border-gray-200">
              <View className="flex-row">
                {activeColumns.map((col, idx) => (
                  <View
                    key={col}
                    style={{ width: columnWidths[idx] }}
                    className="border-r border-gray-200 justify-center px-2 py-2"
                  >
                    <TextInput
                      placeholder="Search..."
                      value={columnFilters[String(col)] || ''}
                      onChangeText={text => onColumnFilterChange(String(col), text)}
                      className="bg-white rounded px-2 py-1.5 border border-gray-300 text-xs text-gray-700"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Data Rows */}
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIdx) => (
              <View
                key={rowIdx}
                className={`flex-row ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50`}
              >
                {activeColumns.map((col, colIdx) => (
                  <View
                    key={`${rowIdx}-${colIdx}`}
                    style={{ width: columnWidths[colIdx] }}
                    className="border-r border-gray-200 justify-center px-2 py-3"
                  >
                    <Text className="text-xs text-gray-700" numberOfLines={2}>
                      {formatCellValue(row[col])}
                    </Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View className="flex-row justify-center py-8">
              <Text className="text-sm text-gray-500 font-medium">No records available</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Pagination Footer */}
      {data.length > 0 && (
        <View className="bg-gray-50 border-t border-gray-200 px-4 py-3">
          <View className="flex-row items-center justify-between flex-wrap gap-3">
            <Text className="text-xs text-gray-600 font-medium">
              Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, data.length)} of{' '}
              {data.length}
            </Text>

            <View className="flex-row gap-2 items-center">
              <TouchableOpacity
                disabled={currentPage === 1}
                onPress={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  currentPage === 1 ? 'bg-gray-200' : 'bg-gray-400'
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    currentPage === 1 ? 'text-gray-500' : 'text-white'
                  }`}
                >
                  ← Prev
                </Text>
              </TouchableOpacity>

              <View className="px-3 py-1.5 bg-white border border-gray-300 rounded">
                <Text className="text-xs font-semibold text-gray-700">
                  {currentPage} / {totalPages}
                </Text>
              </View>

              <TouchableOpacity
                disabled={currentPage === totalPages}
                onPress={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  currentPage === totalPages ? 'bg-gray-200' : 'bg-gray-400 '
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    currentPage == totalPages ? 'text-gray-500' : 'text-white'
                  }`}
                >
                  Next →
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-xs text-gray-500">{activeColumns.length} columns</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default GenericMasterTable;
