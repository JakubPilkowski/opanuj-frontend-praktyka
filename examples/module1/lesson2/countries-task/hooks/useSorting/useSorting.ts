import { useEffect, useState } from 'react';

import { produce } from 'immer';

import ISort from './ISort';

type Args<T> = {
  items: T[];
  loading: boolean;
};

export default function useSorting<T extends Record<string, any>>(
  items: T[],
  sortFn: ISort | Worker,
  sortBy?: string
) {
  const [sortedList, setSortedList] = useState<Args<T>>({
    items,
    loading: true,
  });

  useEffect(() => {
    if (sortFn instanceof Worker) {
      if (!window.Worker) {
        setSortedList({
          items,
          loading: false,
        });
        return;
      }
      setSortedList(
        produce((draft) => {
          draft.loading = true;
        })
      );
      sortFn.postMessage({
        items,
        sortBy,
      });
    } else {
      const result = sortFn(items, sortBy);
      setSortedList({
        items: result,
        loading: false,
      });
    }
  }, [items, sortBy]);

  useEffect(() => {
    if (window.Worker && sortFn instanceof Worker) {
      sortFn.onmessage = (e: MessageEvent<T[]>) => {
        setSortedList({
          items: e.data,
          loading: false,
        });
      };
    }
  }, [sortFn]);

  return sortedList;
}
