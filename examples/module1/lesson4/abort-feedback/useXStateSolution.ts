import { useMachine } from '@xstate/react';

import { assign, fromPromise, setup } from 'xstate';

import { API_URL } from './API_URL';

import User from './User';

import UserData from './UserData';

const fetchMachine = setup({
  actions: {},
  actors: {
    fetchData: fromPromise(
      async ({ input }: { input: { controller: AbortController } }) => {
        const result = await fetch(API_URL, {
          signal: input.controller.signal,
        }).then((res) => res.json());
        return result;
      }
    ),
  },
}).createMachine({
  id: 'fetch',
  initial: 'fetching',
  types: {} as UserData & { controller: AbortController },
  context: {
    users: [],
    isLoading: true,
    error: null,
    controller: new AbortController(),
  },
  states: {
    fetching: {
      invoke: {
        id: 'fetchData',
        src: 'fetchData',
        input: ({ context: { controller } }) => {
          return { controller: controller as AbortController };
        },
        onDone: {
          target: 'success',
          actions: assign({
            users: ({ event }) => {
              return event.output;
            },
            isLoading: false,
            error: null,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) => {
              console.log('🚀 ~ event:', event);
              return 'error';
            },
            isLoading: false,
            users: [],
          }),
        },
      },
      after: {
        5000: {
          target: 'error',
          actions: assign({
            error: 'timeout',
            users: [],
            isLoading: false,
          }),
        },
      },
      exit: ({ context }) => context.controller.abort(),
    },
    success: {},
    error: {
      on: {
        RETRY: {
          target: 'fetching',
          actions: assign({
            isLoading: true,
            users: [],
            error: null,
            controller: () => new AbortController(),
          }),
        },
      },
    },
  },
});

export default function useXStateSolution() {
  const [state, send] = useMachine(fetchMachine);

  const onRetry = () => {
    send({ type: 'RETRY' });
  };

  return {
    users: state.context.users as User[],
    isLoading: state.context.isLoading,
    error: state.context.error,
    retry: onRetry,
  };
}
