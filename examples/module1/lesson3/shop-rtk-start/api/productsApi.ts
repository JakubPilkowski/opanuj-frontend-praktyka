import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PRODUCTS_API_BASE_URL = 'https://fakestoreapi.com/';

export const productsBaseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCTS_API_BASE_URL }),
  endpoints: () => ({}),
});
