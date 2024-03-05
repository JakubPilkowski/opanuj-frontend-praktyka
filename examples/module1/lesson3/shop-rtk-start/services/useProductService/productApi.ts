import { Product } from '../../types/Product';
import { productsBaseApi } from '../../api/productsApi';

const productsApi = productsBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    productById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useProductByIdQuery } = productsApi;
