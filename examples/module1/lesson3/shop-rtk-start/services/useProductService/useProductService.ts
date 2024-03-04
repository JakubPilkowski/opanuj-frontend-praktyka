import { useProductByIdQuery } from './productApi';

type Args = {
  productId: number;
};

export default function useProductService({ productId }: Args) {
  const { data, isLoading, error } = useProductByIdQuery(productId);

  return {
    data,
    isLoading,
    error,
  };
}
