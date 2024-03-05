import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './services/useCartService/cartSlice';
import { productsBaseApi } from './api/productsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsBaseApi.reducerPath]: productsBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsBaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
