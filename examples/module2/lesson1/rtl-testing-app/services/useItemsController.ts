import { useReducer } from 'react';

import { produce } from 'immer';

export interface Item {
  id: number;
  name: string;
}

type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'DELETE_ITEM'; payload: number };

export type State = { items: Item[] };

const initialState: State = {
  items: [],
};

const reducer = (state: State = initialState, action: Action): State => {
  return produce<State>(state, (draftState: State) => {
    switch (action.type) {
      case 'ADD_ITEM':
        draftState.items.push(action.payload);
        break;
      case 'DELETE_ITEM':
        draftState.items = draftState.items.filter(
          (item) => item.id !== action.payload
        );
        break;
      default:
        break;
    }
  });
};

const useItemsController = (baseState?: State) => {
  const [state, dispatch] = useReducer(reducer, baseState || initialState);

  const addItem = (item: Item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const deleteItem = (itemId: number) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId });
  };

  return {
    addItem,
    deleteItem,
    items: state.items,
  };
};

export default useItemsController;
