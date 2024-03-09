import { FC, useRef, useState } from 'react';

import useItemsController, { State } from '../services/useItemsController';

const ItemList: FC<IProps> = ({ baseState }) => {
  const { addItem, deleteItem, items } = useItemsController(baseState);

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');

  const handleDelete = (id: number) => () => {
    deleteItem(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');
    e.preventDefault();
    addItem({ id: Math.random(), name });
  };

  return (
    <aside className="bg-slate-400 rounded-[10px] w-[20%] min-w-[200px] flex flex-col gap-[10px] p-[10px]">
      <h1 className="text-2xl text-white">Lista produktów</h1>
      <ul>
        {items.map((item) => (
          <div key={item.name} className="bg-slate-600 rounded-md p-[10px]">
            <p className="text-white capitalize">{item.name}</p>
            <button onClick={handleDelete(item.id)} aria-label="Usuń">
              Usuń
            </button>
          </div>
        ))}
      </ul>
      <h2 className="text-2xl text-white">Dodaj nowy produkt</h2>
      <form
        role="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-[10px]"
      >
        <div>
          <label htmlFor="name" className="text-slate-200 block mb-2">
            Nazwa produktu
          </label>
          <input
            ref={inputRef}
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-[5px] rounded-md bg-slate-500 border-slate-600 border-2 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
        >
          Dodaj produkt
        </button>
      </form>
    </aside>
  );
};

type IProps = {
  baseState?: State;
};

export default ItemList;
