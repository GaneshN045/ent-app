import { useMemo } from 'react';
import { useGetSubProductsDropdownQuery } from '../services/api/profileApi';
import type { SubProduct } from '../services/types/profileApiTypes';

export function useSubProducts(subProductName?: string) {
  const { data, isLoading, isFetching, error, refetch } = useGetSubProductsDropdownQuery();
  const subProducts: SubProduct[] = data?.data ?? [];

  const subProductId = useMemo(() => {
    if (!subProductName) return undefined;
    const normalized = subProductName.trim().toLowerCase();
    return subProducts.find(product => product.subProduct_name.trim().toLowerCase() === normalized)
      ?.id;
  }, [subProductName, subProducts]);

  return {
    subProducts,
    subProductId,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
}
