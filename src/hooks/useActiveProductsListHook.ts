import { useMemo } from 'react';
import {
  useGetReportProductDropdownQuery,
  useGetReportSubProductsDropdownQuery,
} from '../services/api/reportsApi';

interface DropdownOption {
  label: string;
  value: string;
}

export function useActiveProductsListHook() {
  const { data, isFetching, isError, refetch } = useGetReportProductDropdownQuery();

  const options: DropdownOption[] = useMemo(() => {
    return (data?.data ?? []).map(product => ({
      label: product.productName,
      value: String(product.id),
    }));
  }, [data]);

  return {
    options,
    isLoading: isFetching,
    isError,
    refetch,
  };
}
