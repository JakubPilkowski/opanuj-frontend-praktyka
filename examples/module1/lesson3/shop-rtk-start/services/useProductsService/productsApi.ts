import { Product } from '../../types/Product';
import { productsBaseApi } from '../../api/productsApi';

// Define a service using a base URL and expected endpoints
const productsApi = productsBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<Product[], void>({
      query: () => `products`,
    }),
  }),
});

export const { useProductsQuery } = productsApi;
