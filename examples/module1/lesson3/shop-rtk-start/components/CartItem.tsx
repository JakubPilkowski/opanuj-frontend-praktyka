import useCartService from '../services/useCartService';

import { Link } from 'react-router-dom';
import LoadingFromPromise from './LoadingFromPromise';
import Spinner from './spinner/Spinner';

import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';

import { CartItem as CartItemType } from '../types/CartItem';

const CartItem = ({ item }: { item: CartItemType }) => {
  const { remove, decrease, add } = useCartService();
  const { id, title, image, price, amount } = item;

  const handleRemove = async () => {
    remove(id);
  };

  const handleDecrease = async () => {
    decrease(id);
  };

  const handleAdd = async () => {
    add(item);
  };

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            <LoadingFromPromise
              callback={handleRemove}
              renderContent={(callback, isLoading) => (
                <div onClick={callback} className="text-xl cursor-pointer">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <LoadingFromPromise
                callback={handleDecrease}
                renderContent={(callback, isLoading) => (
                  <div
                    onClick={callback}
                    className="h-full flex-1 flex justify-center items-center cursor-pointer"
                  >
                    {isLoading ? <Spinner /> : <IoMdRemove />}
                  </div>
                )}
              />
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <LoadingFromPromise
                callback={handleAdd}
                renderContent={(callback, isLoading) => (
                  <div
                    onClick={callback}
                    className="h-full flex-1 flex justify-center items-center cursor-pointer"
                  >
                    {isLoading ? <Spinner /> : <IoMdAdd />}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-1 justify-around items-center">
              $ {price}
            </div>
            <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${(
              price * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
