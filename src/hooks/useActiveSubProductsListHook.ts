import { useMemo } from 'react';
import {
  useGetReportProductDropdownQuery,
  useGetReportSubProductsDropdownQuery,
} from '../services/api/reportsApi';

interface DropdownOption {
  label: string;
  value: string;
}

export function useActiveSubProductsListHook(productId?: string) {
  const { data, isFetching, isError } = useGetReportSubProductsDropdownQuery(productId, {
    skip: !productId,
  });

  const options: DropdownOption[] = useMemo(() => {
    return (data?.data ?? []).map(subProduct => ({
      label: subProduct.subProduct_name,
      value: subProduct.id,
    }));
  }, [data]);

  return {
    options,
    isLoading: isFetching,
    isError,
  };
}
