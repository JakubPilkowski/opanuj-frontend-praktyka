import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import useItemsService from './useItemsService';

import { API } from '../constants';

export default function useAuthorsWithItemsList() {
  const { data, isPending } = useItemsService();

  const { data: authors, isPending: areAuthorsPending } =
    useQuery<GetAuthorsPayload>({
      queryKey: ['authors'],
      queryFn: async () => {
        const authorsResponse = await fetch(`${API}/authors?timeout=3000`);
        if (!authorsResponse.ok) {
          throw new Error('Authors request failed');
        }

        // TODO: handle parse error
        const authors = (await authorsResponse.json())?.authors as Author[];

        return authors;
      },
      enabled: !!data,
    });

  const authorsWithItems = useMemo(() => {
    if (!authors) return [];
    return authors.map((author) => ({
      ...author,
      items: data,
    }));
  }, [authors, data]);

  return {
    data: authorsWithItems,
    isPending: areAuthorsPending || isPending,
  };
}

type GetAuthorsPayload = Author[];

type Author = {
  id: number;
  name: string;
  comments: number;
  articles: number;
};
