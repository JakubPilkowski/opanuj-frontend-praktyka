import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { API } from '../constants';

export default function useItemsService() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<GetItemsPayload>({
    queryKey: ['items'],
    queryFn: async () => {
      const data = await fetch(`${API}/items?timeout=2000`).then((res) =>
        res.json()
      );

      // TODO: throw parse error
      const items = !!data
        ? (data.items.map((item) => ({ name: item })) as Item[])
        : ([] as Item[]);

      return items;
    },
  });

  const {
    isPending: isCreating,
    mutateAsync: create,
    variables,
    error: createError,
  } = useMutation<CreateItemData, Error, CreateItemVariables>({
    mutationFn: async ({ name }) => {
      // TODO: implement axios
      const res = await fetch(`${API}/add-item?timeout=2000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const result = await res.json();
        // TODO: backend should return generic error name
        if (result.name === 'ZodError') {
          throw new Error(result.issues[0].message);
        } else {
          throw new Error(`Fetch request failed with status ${res.status}`);
        }
      }

      // TODO: parse error
      const data = (await res.json())?.data as Item;
      return data;
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    mutationKey: ['addItem'],
  });

  // const optimisticItems = useMutationState<OptimisticItem>({
  //   filters: {
  //     mutationKey: ['addItem'],
  //     predicate: (mutation) =>
  //       ['pending', 'error'].includes(mutation.state.status),
  //   },
  //   select: (mutation) => {
  //     const status = mutation.state.status;

  //     switch (status) {
  //       case 'pending':
  //         return {
  //           item: mutation.state.variables as Item,
  //           isPending: true,
  //           error: null,
  //         };
  //       case 'error':
  //         return {
  //           item: mutation.state.variables as Item,
  //           isPending: false,
  //           error: mutation.state.error as Error,
  //         };
  //       default:
  //         return {
  //           item: mutation.state.variables as Item,
  //           isPending: true,
  //           error: null,
  //         };
  //     }
  //   },
  // });

  return {
    data: data || [],
    isPending,
    isCreating,
    create,
    optimisticItem: variables,
    optimisticItems: [] as OptimisticItem[],
    createError,
  };
}

export type GetItemsPayload = Item[];

export type OptimisticItem =
  | {
      item: Item;
      isPending: true;
      error: null;
    }
  | { item: Item; isPending: false; error: Error };

export type Item = {
  name: string;
};

export type CreateItemVariables = {
  name: string;
};

export type CreateItemData = Item;
