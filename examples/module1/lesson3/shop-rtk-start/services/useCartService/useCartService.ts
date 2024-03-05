import { useAppDispatch, useAppSelector } from '../../hooks/rtk';
import {
  addToCart,
  clearCart,
  decreaseAmount,
  removeFromCart,
  selectCartItems,
  selectItemAmount,
  selectTotalPrice,
} from './cartSlice';
import { Product } from '../../types/Product';

// This hooks encapsulates the logic for the cart service without coupling views with redux logic
export default function useCartService() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const amount = useAppSelector(selectItemAmount);
  const totalPrice = useAppSelector(selectTotalPrice);

  const add = async (product: Product) => {
    dispatch(addToCart(product));
  };

  const remove = async (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const decrease = async (productId: number) => {
    dispatch(decreaseAmount(productId));
  };

  const clear = async () => {
    dispatch(clearCart());
  };

  return {
    items,
    loading: false,
    error: undefined,
    amount,
    totalPrice,
    add,
    remove,
    decrease,
    clear,
  };
}
