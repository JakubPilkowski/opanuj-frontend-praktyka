import { FC, useRef, useState } from 'react';

import useItemsService, { Item } from '../services/useItemsService';

import SkeletonList from '../components/SkeletonList';
import { Skeleton } from '../components/Skeleton';
import Spinner from '../components/spinner/Spinner';

const ItemList: FC = () => {
  const { data, isPending, isCreating, optimisticItem, create, createError } =
    useItemsService();

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating) {
      return;
    }
    create({ name });
    setName('');
  };

  const handleRetry = (item: Item) => () => {
    setName(item.name);
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView();
  };

  return (
    <aside className="bg-slate-400 rounded-[10px] w-[20%] min-w-[200px] flex flex-col gap-[10px] p-[10px]">
      <h1 className="text-2xl text-white">Lista produktów</h1>
      {isPending ? (
        <SkeletonList
          itemsCount={10}
          renderItem={(index) => (
            <Skeleton key={index} className="w-full p-[10px] h-[44px]" />
          )}
        />
      ) : (
        <>
          {data.map((item) => (
            <div key={item.name} className="bg-slate-600 rounded-md p-[10px]">
              <p className="text-white capitalize">{item.name}</p>
            </div>
          ))}
          {optimisticItem && (isCreating || !!createError) && (
            <div className="bg-slate-600 rounded-md p-[10px] opacity-50">
              <p className="text-white capitalize">{optimisticItem?.name}</p>
              {isCreating && <Spinner className="w-[12px] h-[12px]" />}
              {!isCreating && (
                <div>
                  <p className="text-[#f00] font-bold">
                    {createError?.message}
                  </p>
                  <button
                    className="bg-slate-500 hover:bg-slate-600 text-white font-bold p-[2px] rounded"
                    onClick={handleRetry(optimisticItem)}
                  >
                    Spróbuj ponownie
                  </button>
                </div>
              )}
            </div>
          )}
          {/* This works but react query does not give possibility to remove single item from mutation cache.
          This leads to optimistic items staying in UI even though we fix/refetch them */}
          {/* {optimisticItems.map(({ item, isPending, error }) => {
            return (
              <div
                key={item.name}
                className="bg-slate-600 rounded-md p-[10px] opacity-50"
              >
                <p className="text-white capitalize">{item.name}</p>
                {isPending && <Spinner className="w-[12px] h-[12px]" />}
                {!isPending && (
                  <div>
                    <p className="text-[#f00] font-bold">{error.message}</p>
                    <button
                      className="bg-slate-500 hover:bg-slate-600 text-white font-bold p-[2px] rounded"
                      onClick={handleRetry(item)}
                    >
                      Spróbuj ponownie
                    </button>
                  </div>
                )}
              </div>
            );
          })} */}
          <div className="h-[2px] w-full bg-slate-500" />
          <h2 className="text-2xl text-white">Dodaj produkt</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
            <div>
              <label htmlFor="name" className="text-slate-200 block mb-2">
                Nazwa produktu
              </label>
              <input
                ref={inputRef}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-[5px] rounded-md bg-slate-500 border-slate-600 border-2 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {createError && (
                <p className="text-red-700">{createError.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
            >
              {isCreating ? (
                <Spinner className="h-[12px] w-[12px]" />
              ) : (
                'Dodaj produkt'
              )}
            </button>
          </form>
        </>
      )}
    </aside>
  );
};

export default ItemList;
