// File: @src/screens/Reports/commission_charges/components/Toolbar.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { TableData } from '../types';
import COLORS from '../../../../constants/colors';

interface ToolbarProps {
  onRefresh: () => void;
  onExport: () => void;
  onToggleFilters: () => void;
  onToggleColumns: (column: keyof TableData) => void;
  onToggleAllColumns: () => void;
  visibleColumns: Record<keyof TableData, boolean>;
  columns: (keyof TableData)[];
  onToggleSearch: () => void;
  searchActive: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onRefresh,
  onExport,
  onToggleFilters,
  onToggleColumns,
  onToggleAllColumns,
  visibleColumns,
  columns,
  onToggleSearch,
  searchActive,
}) => {
  const [columnModal, setColumnModal] = useState(false);
  const [tempSelection, setTempSelection] = useState(visibleColumns);

  const handleSelectAll = () => {
    const newState: any = {};
    columns.forEach(col => (newState[col] = true));
    setTempSelection(newState);
  };

  const handleSubmit = () => {
    // Apply changes
    Object.keys(tempSelection).forEach(col => {
      const key = col as keyof TableData;
      if (tempSelection[key] !== visibleColumns[key]) {
        onToggleColumns(key);
      }
    });

    // Close modal
    setColumnModal(false);
  };

  return (
    <View className="bg-white border-b border-gray-200 px-4 py-4">
      {/* TITLE */}
      <Text className="text-base font-semibold text-gray-700 mb-3">Tools</Text>

      {/* --------------------- TOP ROW --------------------- */}
      <View className="flex-row items-center justify-between">
        {/* Left: Filters + Columns */}
        <View className="flex-row items-center gap-3">
          {/* Filters */}
          <TouchableOpacity
            onPress={onToggleFilters}
            className="flex-row items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 shadow-sm"
          >
            <MaterialIcons name="tune" size={20} color="#374151" />
            <Text className="text-sm font-semibold text-gray-800">Filters</Text>
          </TouchableOpacity>

          {/* Columns (modal trigger) */}
          <TouchableOpacity
            onPress={() => {
              setTempSelection(visibleColumns);
              setColumnModal(true);
            }}
            className="flex-row items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 shadow-sm"
          >
            <MaterialIcons name="view-column" size={20} color="#374151" />
            <Text className="text-sm font-semibold text-gray-800">Columns</Text>
          </TouchableOpacity>
        </View>

        {/* Right: Search */}
        <TouchableOpacity
          onPress={onToggleSearch}
          className={`flex-row items-center gap-2 px-5 py-2.5 rounded-lg shadow-sm ${
            searchActive ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <MaterialIcons name="search" size={20} color={searchActive ? '#fff' : '#374151'} />
          <Text
            className={`text-sm font-semibold ${searchActive ? 'text-white' : 'text-gray-800'}`}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* --------------------- DIVIDER --------------------- */}
      <View className="h-[1px] bg-gray-200 my-4" />

      {/* --------------------- BOTTOM ROW --------------------- */}
      <View className="flex-row items-center justify-between">
        {/* Refresh */}
        <TouchableOpacity
          onPress={onRefresh}
          className="flex-row items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 shadow-sm"
        >
          <MaterialIcons name="refresh" size={20} color="#374151" />
          <Text className="text-sm font-semibold text-gray-800">Refresh</Text>
        </TouchableOpacity>

        {/* Export */}
        <TouchableOpacity
          onPress={onExport}
          className="flex-row items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 shadow-sm"
        >
          <MaterialIcons name="file-download" size={20} color="#374151" />
          <Text className="text-sm font-semibold text-gray-800">Export</Text>
        </TouchableOpacity>
      </View>

      {/* ---------------------------------------------------------------- */}
      {/* COLUMN SELECTION MODAL */}
      {/* ---------------------------------------------------------------- */}
      <Modal visible={columnModal} statusBarTranslucent transparent animationType="fade">
        {/* Outside Press → close modal */}
        <Pressable
          onPress={() => setColumnModal(false)}
          className="flex-1 bg-black/40 justify-center px-6"
        >
          <Pressable
            onPress={e => e.stopPropagation()} // Prevent closing when clicking inside
            className="bg-white rounded-lg p-5 shadow-2xl"
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold text-gray-800">Select Columns</Text>

              <Pressable onPress={() => setColumnModal(false)}>
                <MaterialIcons name="close" size={26} color="#555" />
              </Pressable>
            </View>

            {/* Select All */}
            <TouchableOpacity
              onPress={handleSelectAll}
              className="flex-row items-center gap-2 py-3 border-b border-gray-200"
            >
              <MaterialIcons name="done-all" size={20} color="#374151" />
              <Text className="font-medium text-gray-900">Select All</Text>
            </TouchableOpacity>

            {/* Column List */}
            <ScrollView className="max-h-[80%] mt-2">
              {columns.map(col => (
                <TouchableOpacity
                  key={col}
                  onPress={() =>
                    setTempSelection(prev => ({
                      ...prev,
                      [col]: !prev[col],
                    }))
                  }
                  className="flex-row items-center justify-between py-3"
                >
                  <Text className="text-gray-800 capitalize">{col}</Text>

                  <MaterialIcons
                    name={tempSelection[col] ? 'check-box' : 'check-box-outline-blank'}
                    size={22}
                    color={tempSelection[col] ? COLORS.PRIMARY_COLOR : '#9CA3AF'}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="mt-5 bg-white border border-primary rounded-xl py-3 items-center"
            >
              <Text className="text-primary font-semibold text-base">Apply</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Toolbar;
