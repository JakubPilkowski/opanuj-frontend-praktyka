import { useProductsQuery } from './productsApi';

export default function useProductsService() {
  const { data, isLoading, error } = useProductsQuery();

  return {
    data: data || [],
    isLoading,
    error,
  };
}
